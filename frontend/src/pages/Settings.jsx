// src/pages/Settings.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Card, Input, Button, Alert } from '../components/common';
import { settingsService } from '../services/settings.service';
import { validateSettings } from '../utils/settingsValidation';
import { 
  Save, Mail, Building, CreditCard, Bell, Loader, 
  CheckCircle, XCircle, SendHorizontal 
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const [settings, setSettings] = useState({
    general: {
      motelName: '',
      address: '',
      phone: '',
      email: '',
      taxRate: '',
      currency: 'USD',
      timezone: 'UTC'
    },
    email: {
      smtpHost: '',
      smtpPort: '',
      smtpUser: '',
      smtpPassword: '',
      senderEmail: '',
      senderName: '',
      encryption: 'tls'
    },
    payment: {
      stripeKey: '',
      paypalEmail: '',
      acceptCash: true,
      acceptCard: true,
      acceptPaypal: false,
      currency: 'USD'
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      bookingConfirmation: true,
      checkInReminder: true,
      checkOutReminder: true,
      reminderHours: 24
    }
  });

  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true);
      const data = await settingsService.getSettings();
      setSettings(data);
      setError('');
    } catch (err) {
      setError('Failed to load settings: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleSubmit = async (section) => {
    try {
      setSaving(true);
      setError('');
      setSuccess('');
      setValidationErrors({});

      // Validate settings
      const errors = validateSettings[section]?.(settings[section]) || {};
      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        throw new Error('Please fix the validation errors');
      }

      // Update settings
      await settingsService.updateSettings(section, settings[section]);
      setSuccess(`${section.charAt(0).toUpperCase() + section.slice(1)} settings updated successfully`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const testEmailSettings = async () => {
    try {
      setTesting(true);
      setError('');
      setSuccess('');

      await settingsService.testEmailSettings(settings.email);
      setSuccess('Test email sent successfully! Please check your inbox.');
    } catch (err) {
      setError('Failed to send test email: ' + err.message);
    } finally {
      setTesting(false);
    }
  };

  const updateSetting = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    // Clear validation error when field is updated
    if (validationErrors[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const TabButton = ({ tab, icon: Icon, label }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-md w-full
        ${activeTab === tab 
          ? 'bg-primary-100 text-primary-600 font-medium' 
          : 'hover:bg-gray-100'}`}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </button>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      {error && (
        <Alert 
          type="error" 
          message={error}
          className="mb-4"
          onClose={() => setError('')}
        />
      )}
      {success && (
        <Alert 
          type="success" 
          message={success}
          className="mb-4"
          onClose={() => setSuccess('')}
        />
      )}

      <div className="flex gap-6">
        {/* Settings Navigation */}
        <Card className="w-64 p-4">
          <div className="space-y-2">
            <TabButton tab="general" icon={Building} label="General" />
            <TabButton tab="email" icon={Mail} label="Email" />
            <TabButton tab="payment" icon={CreditCard} label="Payment" />
            <TabButton tab="notifications" icon={Bell} label="Notifications" />
          </div>
        </Card>

        {/* Settings Content */}
        <Card className="flex-1 p-6">
          {activeTab === 'general' && (
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit('general'); }} className="space-y-4">
              <h2 className="text-lg font-medium mb-4">General Settings</h2>
              
              <Input
                label="Motel Name"
                value={settings.general.motelName}
                onChange={(e) => updateSetting('general', 'motelName', e.target.value)}
                error={validationErrors.motelName}
                required
              />

              <Input
                label="Address"
                value={settings.general.address}
                onChange={(e) => updateSetting('general', 'address', e.target.value)}
                error={validationErrors.address}
                required
              />

              <Input
                label="Phone Number"
                value={settings.general.phone}
                onChange={(e) => updateSetting('general', 'phone', e.target.value)}
                error={validationErrors.phone}
                required
              />

              <Input
                label="Email"
                type="email"
                value={settings.general.email}
                onChange={(e) => updateSetting('general', 'email', e.target.value)}
                error={validationErrors.email}
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Currency</label>
                  <select
                    value={settings.general.currency}
                    onChange={(e) => updateSetting('general', 'currency', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Timezone</label>
                  <select
                    value={settings.general.timezone}
                    onChange={(e) => updateSetting('general', 'timezone', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  >
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">Eastern Time</option>
                    <option value="America/Chicago">Central Time</option>
                    <option value="America/Denver">Mountain Time</option>
                    <option value="America/Los_Angeles">Pacific Time</option>
                  </select>
                </div>
              </div>

              <Input
                label="Tax Rate (%)"
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={settings.general.taxRate}
                onChange={(e) => updateSetting('general', 'taxRate', e.target.value)}
                error={validationErrors.taxRate}
              />

              <Button
                type="submit"
                className="flex items-center"
                disabled={saving}
              >
                {saving ? (
                  <Loader className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                {saving ? 'Saving...' : 'Save General Settings'}
              </Button>
            </form>
          )}

          {activeTab === 'email' && (
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit('email'); }} className="space-y-4">
              <h2 className="text-lg font-medium mb-4">Email Settings</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="SMTP Host"
                  value={settings.email.smtpHost}
                  onChange={(e) => updateSetting('email', 'smtpHost', e.target.value)}
                  error={validationErrors.smtpHost}
                  required
                />

                <Input
                  label="SMTP Port"
                  value={settings.email.smtpPort}
                  onChange={(e) => updateSetting('email', 'smtpPort', e.target.value)}
                  error={validationErrors.smtpPort}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="SMTP Username"
                  value={settings.email.smtpUser}
                  onChange={(e) => updateSetting('email', 'smtpUser', e.target.value)}
                  error={validationErrors.smtpUser}
                  required
                />

                <Input
                  label="SMTP Password"
                  type="password"
                  value={settings.email.smtpPassword}
                  onChange={(e) => updateSetting('email', 'smtpPassword', e.target.value)}
                  error={validationErrors.smtpPassword}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Sender Email"
                  type="email"
                  value={settings.email.senderEmail}
                  onChange={(e) => updateSetting('email', 'senderEmail', e.target.value)}
                  error={validationErrors.senderEmail}
                  required
                />

                <Input
                  label="Sender Name"
                  value={settings.email.senderName}
                  onChange={(e) => updateSetting('email', 'senderName', e.target.value)}
                  error={validationErrors.senderName}
                  required
                />
              </div>

             <div>
  <label className="block text-sm font-medium text-gray-700">Encryption</label>
  <select
    value={settings.email.encryption}
    onChange={(e) => updateSetting('email', 'encryption', e.target.value)}
    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
  >
    <option value="tls">TLS</option>
    <option value="ssl">SSL</option>
    <option value="none">None</option>
  </select>
</div>

<div className="flex space-x-4">
  <Button
    type="submit"
    className="flex items-center"
    disabled={saving}
  >
    {saving ? (
      <Loader className="h-4 w-4 mr-2 animate-spin" />
    ) : (
      <Save className="h-4 w-4 mr-2" />
    )}
    {saving ? 'Saving...' : 'Save Email Settings'}
  </Button>

  <Button
    type="button"
    variant="secondary"
    className="flex items-center"
    onClick={testEmailSettings}
    disabled={testing}
  >
    {testing ? (
      <Loader className="h-4 w-4 mr-2 animate-spin" />
    ) : (
      <SendHorizontal className="h-4 w-4 mr-2" />
    )}
    {testing ? 'Sending...' : 'Send Test Email'}
  </Button>
</div>
</form>
)}

{activeTab === 'payment' && (
<form onSubmit={(e) => { e.preventDefault(); handleSubmit('payment'); }} className="space-y-4">
  <h2 className="text-lg font-medium mb-4">Payment Settings</h2>

  <div className="space-y-4">
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="acceptCard"
          checked={settings.payment.acceptCard}
          onChange={(e) => updateSetting('payment', 'acceptCard', e.target.checked)}
          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
        />
        <label htmlFor="acceptCard" className="font-medium">Accept Card Payments</label>
      </div>
      <img src="/assets/cards.png" alt="Credit Cards" className="h-8" />
    </div>

    {settings.payment.acceptCard && (
      <>
        <Input
          label="Stripe Secret Key"
          value={settings.payment.stripeKey}
          onChange={(e) => updateSetting('payment', 'stripeKey', e.target.value)}
          error={validationErrors.stripeKey}
          required
        />
        <Input
          label="Stripe Webhook Secret"
          value={settings.payment.stripeWebhookSecret}
          onChange={(e) => updateSetting('payment', 'stripeWebhookSecret', e.target.value)}
          error={validationErrors.stripeWebhookSecret}
        />
      </>
    )}

    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="acceptPaypal"
          checked={settings.payment.acceptPaypal}
          onChange={(e) => updateSetting('payment', 'acceptPaypal', e.target.checked)}
          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
        />
        <label htmlFor="acceptPaypal" className="font-medium">Accept PayPal</label>
      </div>
      <img src="/assets/paypal.png" alt="PayPal" className="h-8" />
    </div>

    {settings.payment.acceptPaypal && (
      <Input
        label="PayPal Email"
        type="email"
        value={settings.payment.paypalEmail}
        onChange={(e) => updateSetting('payment', 'paypalEmail', e.target.value)}
        error={validationErrors.paypalEmail}
        required
      />
    )}

    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="acceptCash"
          checked={settings.payment.acceptCash}
          onChange={(e) => updateSetting('payment', 'acceptCash', e.target.checked)}
          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
        />
        <label htmlFor="acceptCash" className="font-medium">Accept Cash Payments</label>
      </div>
      <Cash className="h-6 w-6 text-gray-500" />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700">Default Currency</label>
      <select
        value={settings.payment.currency}
        onChange={(e) => updateSetting('payment', 'currency', e.target.value)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
      >
        <option value="USD">USD - US Dollar</option>
        <option value="EUR">EUR - Euro</option>
        <option value="GBP">GBP - British Pound</option>
      </select>
    </div>
  </div>

  <Button
    type="submit"
    className="flex items-center"
    disabled={saving}
  >
    {saving ? (
      <Loader className="h-4 w-4 mr-2 animate-spin" />
    ) : (
      <Save className="h-4 w-4 mr-2" />
    )}
    {saving ? 'Saving...' : 'Save Payment Settings'}
  </Button>
</form>
)}

{activeTab === 'notifications' && (
<form onSubmit={(e) => { e.preventDefault(); handleSubmit('notifications'); }} className="space-y-4">
  <h2 className="text-lg font-medium mb-4">Notification Settings</h2>

  <div className="space-y-6">
    <div className="bg-gray-50 p-4 rounded-lg space-y-4">
      <h3 className="font-medium">Email Notifications</h3>
      <div className="space-y-2">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={settings.notifications.emailNotifications}
            onChange={(e) => updateSetting('notifications', 'emailNotifications', e.target.checked)}
            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <span className="ml-2">Enable Email Notifications</span>
        </label>

        {settings.notifications.emailNotifications && (
          <div className="ml-6 space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.notifications.bookingConfirmation}
                onChange={(e) => updateSetting('notifications', 'bookingConfirmation', e.target.checked)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="ml-2">Send Booking Confirmations</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.notifications.checkInReminder}
                onChange={(e) => updateSetting('notifications', 'checkInReminder', e.target.checked)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="ml-2">Send Check-in Reminders</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.notifications.checkOutReminder}
                onChange={(e) => updateSetting('notifications', 'checkOutReminder', e.target.checked)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="ml-2">Send Check-out Reminders</span>
            </label>
          </div>
        )}
      </div>
    </div>

    <div className="bg-gray-50 p-4 rounded-lg space-y-4">
      <h3 className="font-medium">SMS Notifications</h3>
      <div className="space-y-2">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={settings.notifications.smsNotifications}
            onChange={(e) => updateSetting('notifications', 'smsNotifications', e.target.checked)}
            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <span className="ml-2">Enable SMS Notifications</span>
        </label>

        {settings.notifications.smsNotifications && (
          <div className="ml-6">
            <Input
              label="Twilio Account SID"
              value={settings.notifications.twilioAccountSid}
              onChange={(e) => updateSetting('notifications', 'twilioAccountSid', e.target.value)}
              error={validationErrors.twilioAccountSid}
              required
            />
            <Input
              label="Twilio Auth Token"
              type="password"
              value={settings.notifications.twilioAuthToken}
              onChange={(e) => updateSetting('notifications', 'twilioAuthToken', e.target.value)}
              error={validationErrors.twilioAuthToken}
              required
            />
            <Input
              label="Twilio Phone Number"
              value={settings.notifications.twilioPhoneNumber}
              onChange={(e) => updateSetting('notifications', 'twilioPhoneNumber', e.target.value)}
              error={validationErrors.twilioPhoneNumber}
              required
            />
          </div>
        )}
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700">Reminder Hours Before Check-in/out</label>
      <input
        type="number"
        min="1"
        max="72"
        value={settings.notifications.reminderHours}
        onChange={(e) => updateSetting('notifications', 'reminderHours', parseInt(e.target.value))}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
      />
    </div>
  </div>

  <div className="flex space-x-4">
    <Button
      type="submit"
      className="flex items-center"
      disabled={saving}
    >
      {saving ? (
        <Loader className="h-4 w-4 mr-2 animate-spin" />
      ) : (
        <Save className="h-4 w-4 mr-2" />
      )}
      {saving ? 'Saving...' : 'Save Notification Settings'}
    </Button>

    <Button
      type="button"
      variant="secondary"
      className="flex items-center"
      onClick={() => testNotificationSettings()}
      disabled={testing}
    >
      {testing ? (
        <Loader className="h-4 w-4 mr-2 animate-spin" />
      ) : (
        <Bell className="h-4 w-4 mr-2" />
      )}
      {testing ? 'Sending...' : 'Send Test Notification'}
    </Button>
  </div>
</form>
)}
</Card>
</div>
</div>
);
};

export default Settings;