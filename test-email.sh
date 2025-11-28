#!/bin/bash

# Email System Debugging Script
# This script tests your email endpoints directly

echo "🔍 Email System Debugging"
echo "========================="
echo ""

# Get your production URL
read -p "Enter your production URL (e.g., https://yourdomain.com): " PROD_URL

echo ""
echo "Testing welcome email endpoint..."
echo ""

# Test welcome email
RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X POST "$PROD_URL/api/emails/send-welcome" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "firstName": "Test"
  }')

HTTP_STATUS=$(echo "$RESPONSE" | grep "HTTP_STATUS" | cut -d: -f2)
BODY=$(echo "$RESPONSE" | sed '/HTTP_STATUS/d')

echo "Status Code: $HTTP_STATUS"
echo "Response Body:"
echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
echo ""

if [ "$HTTP_STATUS" = "200" ]; then
    echo "✅ API endpoint is working!"
    echo ""
    echo "Next steps:"
    echo "1. Check Resend dashboard: https://resend.com/emails"
    echo "2. Look for the test email you just sent"
    echo "3. Check delivery status (Delivered/Bounced/Failed)"
    echo ""
    echo "If email shows as 'Delivered' in Resend but you didn't receive it:"
    echo "- Check your spam folder"
    echo "- Verify the recipient email address"
    echo "- Check if your domain is verified in Resend"
else
    echo "❌ API endpoint returned error!"
    echo ""
    echo "Common issues:"
    echo "- Missing RESEND_API_KEY environment variable"
    echo "- Missing FROM_EMAIL environment variable"
    echo "- Invalid Resend API key"
    echo ""
    echo "Check Vercel function logs for more details:"
    echo "Vercel Dashboard → Your Project → Deployments → Latest → Functions"
fi
