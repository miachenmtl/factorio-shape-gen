import { h } from 'preact';
import { render, screen, fireEvent } from '@testing-library/preact';

import CollapsedText from './CollapsedText';

describe('The CollapsedText component', () => {
  it('should initially shqow the button and hide the text', () => {
    render(<CollapsedText label="Show" text="foo" />);
    expect(screen.getByText('Show')).toBeVisible();
    expect(screen.getByText('foo')).not.toBeVisible();
  });

  it('should reveal the text when the label is clicked', () => {
    render(<CollapsedText label="Show" text="foo" />);
    fireEvent.click(screen.getByText('Show'));
    expect(screen.getByText('foo')).toBeVisible();
  });
});