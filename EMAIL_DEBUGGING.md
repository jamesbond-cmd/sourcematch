# Email Debugging Checklist

## Issue: No emails arriving in production

### ✅ Step 1: Check Vercel Environment Variables

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project (`sourcematch`)
3. Go to **Settings** → **Environment Variables**
4. Verify these variables are set for **Production**:

```
RESEND_API_KEY=re_your_actual_key
FROM_EMAIL=Batch Sourcing <hello@updates.batchsourcing.com>
ADMIN_EMAIL=admin@batchsourcing.com (or your actual admin email)
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

**CRITICAL**: If these are missing, add them and **redeploy** your app.

---

### ✅ Step 2: Check Resend Dashboard

1. Go to [Resend Dashboard](https://resend.com/emails)
2. Check the **Emails** tab
3. Look for recent email attempts
4. Check if emails show as:
   - ✅ **Delivered** - Email sent successfully
   - ⚠️ **Bounced** - Email rejected by recipient
   - ❌ **Failed** - Error sending email

**Common Issues**:
- Domain not verified
- API key invalid
- Rate limit exceeded
- Email address blocked

---

### ✅ Step 3: Check Vercel Logs

1. Go to Vercel Dashboard → Your Project
2. Click **Deployments** → Latest deployment
3. Click **Functions** tab
4. Look for errors in:
   - `/api/emails/send-welcome`
   - `/api/emails/send-rfi-submitted`
   - `/api/emails/send-rfi-received`

**What to look for**:
- "RESEND_API_KEY is not defined"
- "Failed to send email"
- Any error messages

---

### ✅ Step 4: Test Email API Directly

Test if the API routes work:

```bash
# Test welcome email
curl -X POST https://your-domain.com/api/emails/send-welcome \
  -H "Content-Type: application/json" \
  -d '{
    "email": "your-test-email@gmail.com",
    "firstName": "Test"
  }'

# Check response - should return:
# {"success":true,"data":{"id":"..."}}

# If error, you'll see:
# {"error":"..."}
```

---

### ✅ Step 5: Check Signup Flow

The welcome email is only sent if `first_name` is in metadata. Let's check:

**Current signup page** doesn't collect first name, so welcome email **won't be sent**.

**To fix**: Either:
1. Add a first name field to signup form
2. Extract name from email (already done in code)
3. Use a default name

---

### ✅ Step 6: Verify Domain in Resend

1. Go to [Resend Dashboard](https://resend.com/domains)
2. Check if `updates.batchsourcing.com` is verified
3. If not verified:
   - Add DNS records
   - Wait for verification
   - Use `onboarding@resend.dev` temporarily for testing

---

## Quick Fix: Test with Resend Test Email

If domain isn't verified, temporarily use Resend's test domain:

**Update in Vercel env vars**:
```
FROM_EMAIL=onboarding@resend.dev
```

Then redeploy and test again.

---

## Most Likely Issues

### 1. Missing Environment Variables (90% of cases)
- **Fix**: Add to Vercel → Settings → Environment Variables
- **Then**: Redeploy the app

### 2. Domain Not Verified (8% of cases)
- **Fix**: Verify domain in Resend or use `onboarding@resend.dev`

### 3. Signup Form Missing First Name (2% of cases)
- **Fix**: Add first name field to signup form

---

## Next Steps

1. **Check Vercel env vars** (most important!)
2. **Check Resend dashboard** for email logs
3. **Check Vercel function logs** for errors
4. **Test API directly** with curl
5. **Report back** what you find

---

## Need Help?

Share with me:
- Screenshot of Vercel environment variables
- Screenshot of Resend dashboard (emails tab)
- Any error messages from Vercel logs
- Response from curl test

I'll help you fix it! 🔧
