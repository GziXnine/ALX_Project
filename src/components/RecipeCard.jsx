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
  const id = recipe.idMeal || recipe.id;

  return (
    <Card
      className={`${sizeClasses[size]} h-full flex flex-col overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1 font-sans text-[0.75rem] sm:text-base md:text-[1.05rem] lg:text-base`}
    >
      <div className="relative">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500 rounded-t-xl"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-xl"></div>
      </div>
      <div className="px-6 pb-6 flex flex-col flex-1">
        {/* Category */}
        <Badge
          variant="secondary"
          className="text-[0.6rem] sm:text-xs md:text-sm font-semibold bg-primary/10 text-primary border-0 mb-2 mt-4"
        >
          {category}
        </Badge>
        {/* Title */}
            <h3 className="font-bold text-[18px] text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors tracking-tight">
          {title}
        </h3>
        {/* Description */}
        {description && (
          <p className="text-[0.75rem] sm:text-base md:text-[1.05rem] lg:text-base text-muted-foreground mb-4 line-clamp-2 leading-relaxed font-normal">
            {description}
          </p>
        )}
        {/* Cuisine */}
        <div className="flex items-center gap-2 mt-auto">
          <span className="inline-block px-2 py-1 bg-accent text-xs rounded font-medium text-primary/80">
            {cuisine}
          </span>
        </div>
        {/* Action Button */}
        <Button
          onClick={() => onViewRecipe(id)}
          className="w-full font-semibold py-2.5 rounded-xl group-hover:bg-primary/90 transition-colors mt-4 text-base"
          variant="default"
        >
          View Recipe
        </Button>
      </div>
    </Card>
  );
}
