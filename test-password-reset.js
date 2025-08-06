// Test script for password reset functionality
const API_BASE_URL = 'http://localhost:5000/api';

async function testPasswordResetAPI() {
  console.log('🧪 Testing Password Reset API...\n');

  // Test 1: Health check
  try {
    const healthResponse = await fetch(`${API_BASE_URL}/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData);
  } catch (error) {
    console.log('❌ Health check failed:', error.message);
    return;
  }

  // Test 2: Forgot password (without email service)
  try {
    const forgotResponse = await fetch(`${API_BASE_URL}/password/forgot`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com'
      })
    });
    
    const forgotData = await forgotResponse.json();
    console.log('✅ Forgot password response:', forgotData);
    
    if (forgotData.email) {
      console.log('📧 Email would be sent to:', forgotData.email);
    }
  } catch (error) {
    console.log('❌ Forgot password failed:', error.message);
  }

  // Test 3: Invalid email format
  try {
    const invalidResponse = await fetch(`${API_BASE_URL}/password/forgot`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'invalid-email'
      })
    });
    
    const invalidData = await invalidResponse.json();
    console.log('✅ Invalid email validation:', invalidData);
  } catch (error) {
    console.log('❌ Invalid email test failed:', error.message);
  }

  console.log('\n🎉 API testing completed!');
  console.log('\n📝 Next steps:');
  console.log('1. Configure email service in backend/.env');
  console.log('2. Start frontend: npm run dev');
  console.log('3. Test the full flow in browser');
}

// Run the test
testPasswordResetAPI().catch(console.error); 