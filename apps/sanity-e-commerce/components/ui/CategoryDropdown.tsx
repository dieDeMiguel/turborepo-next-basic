'use client';

import React from 'react';
import Dropdown from './Dropdown';
import { Category } from '@/sanity.types';

interface CategoryDropdownProps {
  categories: Category[];
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({ categories }) => {
  const validCategories = categories.filter((category) => category.title && category.slug?.current);

  const items = validCategories.map((category) => ({
    label: category.title as string,
    href: `/store/categories/${category.slug!.current}`,
  }));

  return <Dropdown label="Filter by Category" items={items} />;
};

export default CategoryDropdown;
