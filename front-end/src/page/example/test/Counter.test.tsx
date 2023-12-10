import {render, fireEvent, screen} from '@testing-library/react'

import Counter from '../Counter';

describe("Counter", () => {
    it('should incremnets counter', () => {
        render(<Counter />)
    
        const counter = screen.getByTestId('counter');
        const incrementBtn = screen.getByTestId('increment');
    
        fireEvent.click(incrementBtn)
    
        expect(counter).toHaveTextContent("2");
    });

    it('should decrement counter', () => {
        render(<Counter />)
    
        const counter = screen.getByTestId('counter');
        const decrementBtn = screen.getByTestId('decrement');
    
        fireEvent.click(decrementBtn)
    
        expect(counter).toHaveTextContent("0");
    })
})