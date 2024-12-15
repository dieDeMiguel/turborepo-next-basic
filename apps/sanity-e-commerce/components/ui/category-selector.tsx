'use client';

import { ChevronsUpDown, Check } from 'lucide-react';

import { Category } from '@/sanity.types';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Button } from './button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './command';
import { cn } from '@/lib/utils';

export default function CategorySelectorComponent({ categories }: { categories: Category[] }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>('');
  const router = useRouter();
  const navigation = useParams();

  useEffect(() => {
    if (navigation.slug && categories && categories.find((c) => c.slug?.current === navigation.slug)) {
      const selectedCategory = categories.find((c) => c.slug?.current === navigation.slug);
      if (selectedCategory) {
        setValue(selectedCategory._id);
      }
    }
  }, [navigation.slug, categories]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="relative mb-4 flex w-full max-w-full items-center justify-center space-x-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 hover:text-white sm:flex-none sm:justify-start"
        >
          {value ? categories.find((category) => category._id === value)?.title : 'Filter by Category'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder="Search category..."
            className="h-9"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const selectedCategory = categories.find((c) =>
                  c.title?.toLowerCase().includes(e.currentTarget.value.toLowerCase())
                );
                if (selectedCategory?.slug?.current) {
                  setValue(selectedCategory._id);
                  router.push(`/store/categories/${selectedCategory.slug.current}`);
                  setOpen(false);
                }
              }
            }}
          />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {categories.map((category) => (
                <CommandItem
                  key={category._id}
                  value={category.title}
                  onSelect={() => {
                    setValue(value === category._id ? '' : category._id);
                    router.push(`/store/categories/${category.slug?.current}`);
                    setOpen(false);
                  }}
                >
                  {category.title}
                  <Check className={cn('ml-auto size-4', value === category._id ? 'opacity-100' : 'opacity-0')} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
