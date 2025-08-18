-- Set OTP expiry to recommended 10 minutes (600 seconds)
-- This fixes the security warning about OTP expiry exceeding recommended threshold

-- Update the auth configuration to set OTP expiry to 10 minutes
INSERT INTO auth.config (parameter, value) 
VALUES ('OTP_EXPIRY', '600')
ON CONFLICT (parameter) 
DO UPDATE SET value = '600';

-- Also ensure email OTP expiry is set to recommended value
INSERT INTO auth.config (parameter, value) 
VALUES ('EMAIL_OTP_EXPIRY', '600')
ON CONFLICT (parameter) 
DO UPDATE SET value = '600';

-- Set SMS OTP expiry to recommended value
INSERT INTO auth.config (parameter, value) 
VALUES ('SMS_OTP_EXPIRY', '600')
ON CONFLICT (parameter) 
DO UPDATE SET value = '600';