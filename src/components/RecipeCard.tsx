import { Clock, Users, Star } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Recipe {
  id: string;
  title: string;
  category: string;
  cuisine: string;
  image: string;
  cookTime: string;
  servings: number;
  rating: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description?: string;
  chef?: string;
  trending?: boolean;
}

interface RecipeCardProps {
  recipe: Recipe;
  onViewRecipe: (recipeId: string) => void;
  size?: 'small' | 'medium' | 'large';
}

export function RecipeCard({ recipe, onViewRecipe, size = 'medium' }: RecipeCardProps) {
  const sizeClasses = {
    small: 'w-64',
    medium: 'w-full max-w-sm mx-auto',
    large: 'w-full'
  };

  const difficultyColors = {
    Easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    Hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
  };

  return (
    <Card className={`${sizeClasses[size]} overflow-hidden hover:shadow-md transition-shadow duration-200`}>
      <div className="relative">
        <ImageWithFallback
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-48 object-cover"
        />
        
        {/* Difficulty Badge */}
        <div className="absolute top-2 right-2">
          <Badge className={`${difficultyColors[recipe.difficulty]} text-xs`}>
            {recipe.difficulty}
          </Badge>
        </div>
        
        {/* Rating */}
        <div className="absolute bottom-2 right-2 bg-background/90 backdrop-blur-sm px-2 py-1 rounded flex items-center gap-1 text-sm">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">{recipe.rating}</span>
        </div>
      </div>

      <div className="p-4">
        {/* Category */}
        <Badge variant="secondary" className="text-xs mb-2">
          {recipe.category}
        </Badge>

        {/* Title */}
        <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
          {recipe.title}
        </h3>

        {/* Description */}
        {recipe.description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {recipe.description}
          </p>
        )}

        {/* Recipe Meta */}
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{recipe.cookTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{recipe.servings}</span>
          </div>
          <span className="text-xs bg-muted px-2 py-1 rounded">
            {recipe.cuisine}
          </span>
        </div>

        {/* Action Button */}
        <Button 
          onClick={() => onViewRecipe(recipe.id)}
          className="w-full"
          variant="default"
        >
          View Recipe
        </Button>
      </div>
    </Card>
  );
}