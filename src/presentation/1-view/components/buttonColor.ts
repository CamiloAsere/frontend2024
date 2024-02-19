export type Color = 'red' | 'green' | 'blue';

let myColor: Color;
myColor = 'red'; // Esto está bien
myColor = 'green'; // Esto también está bien
myColor = 'blue'; // Esto también está bien
myColor = 'yellow'; // Error: Type '"yellow"' is not assignable to type 'Color'
