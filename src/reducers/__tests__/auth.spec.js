import expect from 'expect';
import Immutable from 'immutable';
import { authenticating, authenticate, authError } from '../../actions/auth';
import auth from '../auth';

describe('auth', () => {
  it('should handle an empty state', () => {
    expect(
      auth(undefined, {})
    ).toEqual(
      null
    );
  });

  it('should handle an authentication request', () => {
    expect(
      auth(undefined, authenticating())
    ).toEqual(
      Immutable.Map({ isFetching: true })
    );
  });

  it('should handle authentication', () => {
    expect(
      auth(undefined, authenticate({ email: 'joe@example.com' }))
    ).toEqual(
      Immutable.fromJS({ user: { email: 'joe@example.com' } })
    );
  });

  it('should handle an authentication error', () => {
    expect(
      auth(undefined, authError(new Error('Bad credentials')))
    ).toEqual(
      Immutable.Map({
        error: 'Error: Bad credentials'
      })
    );
  });
});
