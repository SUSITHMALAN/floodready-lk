import assert from 'node:assert/strict'
import test from 'node:test'
import { validateCredentials, validateSignup } from './validation.ts'

test('requires an email and password', () => {
  assert.deepEqual(validateCredentials('', ''), {
    email: 'Please enter your email address.', password: 'Please enter your password.',
  })
})
test('rejects malformed email and short password', () => {
  assert.deepEqual(validateCredentials('not-an-email', '12345'), {
    email: 'Please enter a valid email address.', password: 'Password must be at least 6 characters.',
  })
})
test('requires matching password confirmation', () => {
  assert.equal(validateSignup('person@example.com', 'secret1', 'secret2').confirmPassword, 'Passwords do not match.')
})
test('accepts valid signup details', () => {
  assert.deepEqual(validateSignup('person@example.com', 'secret1', 'secret1'), {})
})
