'use client'

import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  const [imageUrl, setImageUrl] = useState('');
  const [size, setSize] = useState('');
  const [flavor, setFlavor] = useState('');
  const [frosting, setFrosting] = useState('');
  const [filling, setFilling] = useState('');
  const [decoration, setDecoration] = useState('');
  const [gender, setGender] = useState('');

  const [recipe, setRecipe] = useState('');
  const [price, setPrice] = useState('');
  
  return (
    <div className="grid grid-rows-[8px_1fr_8px] items-center justify-items-center min-w-full min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2  sm:items-start max-w-lg w-full">

        <h1 className='text-4xl font-bold tracking-tight w-full'>CakeGen</h1>

        <ol className="list-inside list-decimal text-sm text-left">
          <li className="mb-2">
            Get started by entering basic information about the cake you would like.
          </li>
          <li className="mb-2">Generate an initial demo of the cake.</li>
          <li className="mb-2">Elaborate and re-generate on frosting, filling, design if there is anything you would like changed.</li>
          <li>Finish by placing an order at a nearby bakery, or receive a recipe to use yourself!</li>
        </ol>
        
        <div className='flex flex-col space-y-2'>
          <Label htmlFor='cakeSize'>Cake size</Label>
          <ComboboxDemo
          setUserChoice={setSize}
          id='cakeSize' placeholder='Select cake size' options={['Cupcakes', '6" Round (serves 8-10)', '9" Round (serves 16-20)', '1/4 Sheet (serves 25-35)', '1/2 Sheet (serves 48-56)']} />
        </div>

        <div className='flex flex-col space-y-2'>
          <Label htmlFor='cakeFlavor'>Flavor</Label>
          <ComboboxDemo setUserChoice={setFlavor} id='cakeFlavor' placeholder='Select flavor' options={['Chocolate', 'Orange', 'Banana', 'Red Velvet', 'Pumpkin', 'Lemon', 'Vanilla']} />
        </div>

        <div className='flex flex-col space-y-2'>
          <Label htmlFor='cakeFrosting'>Frosting</Label>
          <ComboboxDemo setUserChoice={setFrosting} id='cakeFrosting' placeholder='Select a frosting' options={['Vanilla', 'Orange', 'Lemon', 'Chocolate', 'Espresso', 'Cream Cheese', 'Strawberry', 'Peanut Butter']} />
        </div>

        <div className='flex flex-col space-y-2'>
          <Label htmlFor='cakeFilling'>Cake filling</Label>
          <ComboboxDemo setUserChoice={setFilling} id='cakeFilling' placeholder='Select filling' options={['Raspberry', 'Strawberry', 'Pineapple Apricot', 'Lemon Curd','Bavarian Cream', 'Chocolate  Ganache', 'Caramel', 'No filling']} />
        </div>

        <div className='flex flex-col space-y-2'>
          <Label htmlFor='cakeDecoration'>Cake decoration</Label>
          <ComboboxDemo setUserChoice={setDecoration} id='cakeDecoration' placeholder='Select decoration' options={['Floral', 'Seasonal', 'Flavor Based', 'Celebratory']} />
        </div>

        <div className='flex flex-col space-y-2'>
          <Label htmlFor='personality'>Gender, age, or personality</Label>
          <ComboboxDemo setUserChoice={setGender} id='personality' placeholder='Enter personality' options={['Gender Neutral', 'Female', 'Male', 'Child', 'Adult']} />
        </div>

        <Button onClick={async () => {
          console.log('clicked!');
          setImageUrl('');
          
          let resp = await fetch(`http://localhost/cake_image?size=${encodeURIComponent(size)}&flavor=${encodeURIComponent(flavor)}&frosting=${encodeURIComponent(frosting)}&filling=${encodeURIComponent(filling)}&decoration=${encodeURIComponent(decoration)}&gender=${encodeURIComponent(gender)}`);
          let obj = await resp.json();
          setImageUrl(obj.url);
          setPrice(obj.price);
          setRecipe('');
        }}>
          Generate! (please be patient)
        </Button>

        {imageUrl.length > 0 && <div className='pt-16 flex flex-col gap-8'>

          
          <h2 className='text-2xl font-bold tracking-tight w-full pt-8'>Estimated price</h2>
          <div>{price}</div>

          <h2 className='text-2xl font-bold tracking-tight w-full'>Visual result</h2>
          <img src={imageUrl} />

          <div className='flex flex-wrap gap-4'>
            <Button onClick={() => {
              console.log('clicked!');
            }}>
              Place an online order (future feature)
            </Button>
            <Button variant='secondary' onClick={async () => {
                console.log('clicked!');
                let resp = await fetch(`http://localhost/cake_recipe?size=${encodeURIComponent(size)}&flavor=${encodeURIComponent(flavor)}&frosting=${encodeURIComponent(frosting)}&filling=${encodeURIComponent(filling)}&decoration=${encodeURIComponent(decoration)}&gender=${encodeURIComponent(gender)}`);
                let obj = await resp.json();
                setRecipe(obj.recipe);
                console.log(recipe);
              }}
            >
              Generate recipe
            </Button>
          </div>

          {recipe.length > 0 && <>
            <h2 className='text-2xl font-bold tracking-tight w-full pt-8'>Recipe</h2>
            <div>{recipe}</div>
          </>}

        </div>}

        
      </main>
      <footer className="row-start-3 flex gap-6 pt-12 flex-wrap items-center justify-center">
        <div
          className="flex items-center gap-2 text-neutral-500"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          CakeGen was created during OS4AI (Redmond)
        </div>
      </footer>
    </div>
  );
}






 
import { Check, ChevronsUpDown } from "lucide-react"
 
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";

 
function ComboboxDemo({options, placeholder, id, setUserChoice}) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [commandInputValue, setCommandInputValue] = useState('');

  const selectionOptions = options;

  useEffect(() => {
    setUserChoice(value);
  }, [value])

  return (
    <Popover id={id} open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
        >
          {value
            ? value
            : placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder={placeholder} value={commandInputValue} onValueChange={(val) => {
            // console.log('test')
            // console.log(event.target.value);
            setCommandInputValue(val)
          }} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {selectionOptions.map((selectionOption) => (
                <CommandItem
                  key={selectionOption}
                  value={selectionOption}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {selectionOption}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === selectionOption ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
            {commandInputValue.trim() && <><CommandSeparator />
            <CommandGroup>
              <CommandItem
                key={commandInputValue.trim()}
                value={selectionOptions.indexOf(commandInputValue.trim()) < 0 ? commandInputValue.trim() : ''}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
              >
                {'Other: "'+commandInputValue.trim()+'"'}
                <Check
                  className={cn(
                    "ml-auto",
                    value === commandInputValue.trim() ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            </CommandGroup></>}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}