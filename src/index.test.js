import { h } from 'preact';
import { render } from '@testing-library/preact';

import App from './';

describe('The main App container', () => {
  it('should exist', () => {
    const { container } = render(<App />);
    expect(container.textContent).toContain('Factorio');
  });
});