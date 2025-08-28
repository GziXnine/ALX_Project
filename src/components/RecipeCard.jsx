/** @format */

import { Clock, Users, Star } from "lucide-react";
import { Card } from "./card";
import { Badge } from "./badge";
import { Button } from "./button";
import { ImageWithFallback } from "./ImageWithFallback";
import React from "react";

export function RecipeCard({
  recipe,
  onViewRecipe,
  size = "medium",
  showTrending = false,
}) {
  const sizeClasses = {
    small: "w-64",
    medium: "w-full max-w-sm mx-auto",
    large: "w-full",
  };
  const difficultyColors = {
    Easy: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    Medium:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    Hard: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  };

  // Map TheMealDB API fields to expected props, fallback to existing props
  const title = recipe.strMeal || recipe.title;
  const image = recipe.strMealThumb || recipe.image;
  const category = recipe.strCategory || recipe.category;
  const cuisine = recipe.strArea || recipe.cuisine;
  const description = recipe.strInstructions
    ? recipe.strInstructions.split(".")[0] + "."
    : recipe.description;
  const difficulty = recipe.difficulty || "Medium";
  const rating = recipe.rating || 4.5;
  const cookTime = recipe.cookTime || "20 mins";
  const servings = recipe.servings || 3;
  const id = recipe.idMeal || recipe.id;

  return (
    <Card
      className={`${sizeClasses[size]} h-full flex flex-col overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1`}
    >
      <div className="relative">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        {/* Difficulty Badge */}
        <div className="absolute top-3 left-3">
          <Badge
            className={`${difficultyColors[difficulty]} text-xs font-semibold shadow-sm`}
          >
            {difficulty}
          </Badge>
        </div>
        {/* Rating */}
        <div className="absolute top-3 right-3 bg-background/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 text-sm font-medium shadow-sm">
          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          <span>{rating}</span>
        </div>
        {/* Chef Info - Shows on hover */}
        {recipe.chef && (
          <div className="absolute bottom-3 left-3 bg-background/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Chef {recipe.chef}
          </div>
        )}
      </div>
      <div className="px-6 pb-6">
        {/* Category & Trending */}
        <div className="flex items-center justify-between mb-3">
          <Badge
            variant="secondary"
            className="text-xs font-medium bg-primary/10 text-primary border-0"
          >
            {category}
          </Badge>
          {recipe.trending && (
            <Badge className="text-xs font-medium bg-orange-100 text-orange-600 border-0">
              🔥 Trending
            </Badge>
          )}
        </div>
        {/* Title */}
        <h3 className="font-bold text-lg text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        {/* Description */}
        {description && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}
        {/* Recipe Meta */}
        <div className="grid grid-cols-3 gap-2 text-sm text-muted-foreground mb-6">
          <div className="flex flex-col items-center text-center">
            <Clock className="w-4 h-4 mb-1 text-primary" />
            <span className="font-medium text-xs">{cookTime}</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <Users className="w-4 h-4 mb-1 text-primary" />
            <span className="font-medium text-xs">{servings} servings</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-4 h-4 mb-1 flex items-center justify-center">
              <span className="text-xs font-bold text-primary">🌍</span>
            </div>
            <span className="font-medium text-xs">{cuisine}</span>
          </div>
        </div>
        {/* Action Button */}
        <Button
          onClick={() => onViewRecipe(id)}
          className="w-full font-semibold py-2.5 rounded-xl group-hover:bg-primary/90 transition-colors"
          variant="default"
        >
          View Recipe
        </Button>
      </div>
    </Card>
  );
}
