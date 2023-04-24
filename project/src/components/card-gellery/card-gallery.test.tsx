import { render, screen } from '@testing-library/react';
import CardGallery from './card-gallery';
import { datatype, image } from 'faker';

describe('Component: CardGallery', () => {

  it('should render correctly', () => {
    const fakeImages = datatype.array(6).map(() => (image.imageUrl(640, 480, 'cat', true)));
    render(
      <CardGallery images={fakeImages} offerType={''} />
    );

    const items = screen.getAllByRole('listitem');
    expect(items.length).toBe(fakeImages.length);
  });
});
