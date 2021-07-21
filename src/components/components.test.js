import { h } from 'preact';
import { render, screen, fireEvent } from '@testing-library/preact';

import CollapsedText from './CollapsedText';
import DropdownSelect from './DropdownSelect';
// import NumberInput from './NumberInput';
import Button from './Button';

describe('The CollapsedText component', () => {
  it('should initially show the button and hide the text', () => {
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

describe('The DropdownSelect Component', () => {
  it('should display the label passed as a prop', () => {
    render(<DropdownSelect
      labelName="f"
      labelText="foo"
      options={['A', 'B']}
      values={['a', 'b']}
      selectedValue="a"
    />);
    expect(screen.getByLabelText('foo')).toBeVisible();
  });

  it('should call the callback passed as a prop when an option is selected', () => {
    const spy = jest.fn();
    render(<DropdownSelect
      labelName="f"
      labelText="foo"
      options={['A', 'B']}
      values={['a', 'b']}
      selectedValue="a"
      callback={spy}
    />);
    expect(spy).not.toHaveBeenCalled();
    expect(screen.queryByDisplayValue('B')).toBeNull(); // getBy... throws error if not found

    fireEvent.change(screen.getByLabelText('foo'), { target: { value: 'b' } });
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].target.value).toBe('b');
    expect(screen.queryByDisplayValue('B')).toBeDefined();
  });
});

describe('The Button Component', () => {
  it('should display the text passed as props', () => {
    render(<Button text="foo" />);
    expect(screen.getByText('foo')).toBeDefined();
  });

  it('should fire a callback when the user clicks the button', () => {
    const spy = jest.fn();
    render(<Button text="foo" callback={spy} />);
    expect(spy).not.toHaveBeenCalled();
    fireEvent.click(screen.getByText('foo'));
    expect(spy).toHaveBeenCalled();
  });
});
