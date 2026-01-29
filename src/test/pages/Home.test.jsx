import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../../pages/Home';

describe('Home Page', () => {
  const renderHome = () => {
    return render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
  };

  it('renders without crashing', () => {
    renderHome();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('displays the home page class', () => {
    const { container } = renderHome();
    expect(container.querySelector('.home-page')).toBeInTheDocument();
  });
});
