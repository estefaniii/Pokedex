cat << 'EOF' > README.md
# 🎮 Pokedex - Ultimate Pokémon Encyclopedia

<div align="center">
  <img src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" width="250" style="border-radius: 15px; box-shadow: 0 4px 12px rgba(0,0,0,0.15)" alt="Pokedex Logo">
  
  [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
  ![React Version](https://img.shields.io/badge/React-18+-61DAFB.svg?logo=react)
  ![Vite Version](https://img.shields.io/badge/Vite-4.x-646CFF.svg?logo=vite)
</div>

## ✨ Key Features

| 🔍 | 📊 | 🎨 |
|----|----|----|
| **Advanced search** by name or type | **Detailed stats** visualization | **Type-specific** color themes |

| 📱 | 🔄 | 🌓 |
|----|----|----|
| **Responsive design** | **Pagination** system | **Dark/Light** mode |

## 🛠️ Technologies Used

<div align="center">

![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white&style=for-the-badge)
![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white&style=for-the-badge)
![TailwindCSS](https://img.shields.io/badge/-TailwindCSS-06B6D4?logo=tailwindcss&logoColor=white&style=for-the-badge)
![PokeAPI](https://img.shields.io/badge/-PokeAPI-EF5350?logo=pokemon&logoColor=white&style=for-the-badge)

</div>

## 🚀 Getting Started

```bash
# 1. Clone repository
git clone https://github.com/estefaniii/Pokedex.git
cd pokedex-app

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

## 🎨 Interface Components

```jsx
// Example Pokemon Card Component
function PokemonCard({ pokemon }) {
  const primaryType = pokemon.types[0];
  return (
    <Link to={\`/pokedex/\${pokemon.name}\`} className={\`pokemon-card \${typeColors[primaryType]}\`}>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <h3>{pokemon.name}</h3>
      <div className="type-badges">
        {pokemon.types.map(type => (
          <span key={type} className={\`type-badge \${typeColors[type]}\`}>
            {type}
          </span>
        ))}
      </div>
    </Link>
  );
}
```

## 📂 Project Structure

```
src/
├── app/               # Feature-based modules
│   ├── details/
│   ├── home/
│   └── pokedex/            
├── components/       # Reusable UI components
│   ├── Header.jsx
│   ├── PikachuAnimation.jsx
│   └── ThemeToggle.jsx
├── context/          # State management
├── layout/           # Page layouts
├── routes/           # Application routes
```

## 🌈 Type System

The application features a comprehensive type system with:

- 18 Pokémon types
- Unique color gradients for each type
- Dynamic border colors
- Text contrast optimization

```css
/* Example type styling */
.type-bg--fire {
  background: linear-gradient(176.37deg, #f96d6f -32.26%, #e35825 22.55%, #e8ae1b 125.72%);
}
.type-text--fire {
  color: white; /* Ensures readability */
}
```

## 🤝 How to Contribute

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request



## 💖 Support This Project

If you find this application useful, consider supporting its development:

[![Donate with PayPal](https://img.shields.io/badge/Donate-PayPal-00457C?style=for-the-badge&logo=paypal)](https://paypal.me/estefanniii?country.x=PA&locale.x=es_XC)

---

<div align="center">
  <p>✨ Made with ❤️ by Estefani</p>
</div>
EOF
