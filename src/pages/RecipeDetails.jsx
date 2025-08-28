/** @format */

import {
  ArrowLeft,
  Clock,
  Users,
  Star,
  Heart,
  Share2,
  Printer,
  ChefHat,
} from "lucide-react";
import { Button } from "../components/button";
import { Card } from "../components/card";
import { Badge } from "../components/badge";
import { Separator } from "../components/separator";
import { ImageWithFallback } from "../components/ImageWithFallback";
import { useState } from "react";
import React from "react";

export function RecipeDetails({ recipeId, onBack }) {
  const [checkedIngredients, setCheckedIngredients] = useState(new Set());

  // Mock recipe data - in a real app this would come from an API
  const recipe = {
    id: recipeId,
    title: "Classic Spaghetti Carbonara",
    description:
      "A traditional Italian pasta dish from Rome made with eggs, hard cheese, cured pork, and black pepper. This authentic recipe delivers creamy, silky pasta without using cream.",
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFnaGV0dGklMjBjYXJib25hcmF8ZW58MXx8fHwxNzU1MDM1MTI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Main Course",
    cuisine: "Italian",
    cookTime: "20 mins",
    prepTime: "10 mins",
    totalTime: "30 mins",
    servings: 4,
    rating: 4.8,
    reviewCount: 342,
    difficulty: "Medium",
    calories: 580,
    author: {
      name: "Chef Marco Romano",
      image:
        "https://images.unsplash.com/photo-1683702831004-97203ddc564e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBjaGVmJTIwY29va2luZyUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NTAzNDk3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      bio: "Italian cuisine specialist with 15 years of experience",
    },
    ingredients: [
      { item: "Spaghetti", amount: "400g" },
      { item: "Large eggs", amount: "3 whole + 2 yolks" },
      { item: "Pecorino Romano cheese, grated", amount: "100g" },
      { item: "Pancetta or guanciale, diced", amount: "150g" },
      { item: "Black pepper, freshly ground", amount: "1 tsp" },
      { item: "Salt", amount: "to taste" },
      { item: "Extra virgin olive oil", amount: "1 tbsp" },
    ],
    instructions: [
      {
        step: 1,
        title: "Prepare the cheese and egg mixture",
        description:
          "In a large bowl, whisk together the whole eggs, egg yolks, and grated Pecorino Romano cheese. Add plenty of freshly ground black pepper and mix well. Set aside.",
      },
      {
        step: 2,
        title: "Cook the pasta",
        description:
          "Bring a large pot of salted water to a boil. Add spaghetti and cook according to package directions until al dente. Reserve 1 cup of pasta cooking water before draining.",
      },
      {
        step: 3,
        title: "Cook the pancetta",
        description:
          "While pasta cooks, heat olive oil in a large skillet over medium heat. Add diced pancetta and cook until crispy and golden, about 4-5 minutes.",
      },
      {
        step: 4,
        title: "Combine pasta and pancetta",
        description:
          "Add the drained hot pasta directly to the skillet with pancetta. Toss quickly to combine and remove from heat.",
      },
      {
        step: 5,
        title: "Create the carbonara sauce",
        description:
          "Quickly pour the egg and cheese mixture over the hot pasta, tossing constantly with tongs. The heat from the pasta will cook the eggs gently. Add pasta water gradually if needed to achieve a creamy consistency.",
      },
      {
        step: 6,
        title: "Serve immediately",
        description:
          "Serve immediately in warm bowls, topped with additional grated cheese and black pepper. Enjoy while hot!",
      },
    ],
    nutrition: [
      { label: "Calories", value: "580", unit: "kcal" },
      { label: "Protein", value: "28", unit: "g" },
      { label: "Carbs", value: "65", unit: "g" },
      { label: "Fat", value: "22", unit: "g" },
      { label: "Fiber", value: "3", unit: "g" },
      { label: "Sodium", value: "890", unit: "mg" },
    ],
    tags: ["Italian", "Pasta", "Quick", "Classic", "Comfort Food"],
    tips: [
      "Use room temperature eggs for best results",
      "Work quickly when combining the egg mixture to prevent scrambling",
      "Save some pasta water - it helps create the perfect creamy texture",
      "Freshly grated cheese makes a big difference in flavor",
    ],
  };

  const toggleIngredient = (index) => {
    const newChecked = new Set(checkedIngredients);
    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setCheckedIngredients(newChecked);
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container">
        {/* Back Button */}
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Search
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Image and Title */}
            <div>
              <ImageWithFallback
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-80 object-cover rounded-lg shadow-lg"
              />

              <div className="mt-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-primary/10 text-primary border-primary/20">
                    {recipe.category}
                  </Badge>
                  <Badge variant="outline">{recipe.cuisine}</Badge>
                  <Badge variant="outline">{recipe.difficulty}</Badge>
                </div>

                <h1 className="text-3xl font-bold text-foreground mb-3">
                  {recipe.title}
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {recipe.description}
                </p>
              </div>
            </div>

            {/* Recipe Meta */}
            <Card className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Total Time</p>
                  <p className="font-semibold text-foreground">
                    {recipe.totalTime}
                  </p>
                </div>
                <div className="text-center">
                  <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Servings</p>
                  <p className="font-semibold text-foreground">
                    {recipe.servings}
                  </p>
                </div>
                <div className="text-center">
                  <Star className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Rating</p>
                  <div className="flex items-center justify-center gap-1">
                    <span className="font-semibold text-foreground">
                      {recipe.rating}
                    </span>
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </div>
                </div>
                <div className="text-center">
                  <div className="w-6 h-6 text-primary mx-auto mb-2 flex items-center justify-center font-bold text-sm">
                    CAL
                  </div>
                  <p className="text-sm text-muted-foreground">Calories</p>
                  <p className="font-semibold text-foreground">
                    {recipe.calories}
                  </p>
                </div>
              </div>
            </Card>

            {/* Instructions */}
            <Card className="p-6">
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                Instructions
              </h2>
              <div className="space-y-6">
                {recipe.instructions.map((instruction) => (
                  <div key={instruction.step} className="flex gap-4">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 font-semibold">
                      {instruction.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-2">
                        {instruction.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {instruction.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Chef's Tips */}
            <Card className="p-6">
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                Chef's Tips
              </h2>
              <ul className="space-y-3">
                {recipe.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-muted-foreground">{tip}</p>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Action Buttons */}
            <Card className="p-4">
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex flex-col items-center gap-1 h-auto py-3"
                >
                  <Heart className="w-4 h-4" />
                  <span className="text-xs">Save</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex flex-col items-center gap-1 h-auto py-3"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="text-xs">Share</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex flex-col items-center gap-1 h-auto py-3"
                >
                  <Printer className="w-4 h-4" />
                  <span className="text-xs">Print</span>
                </Button>
              </div>
            </Card>

            {/* Author */}
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <ImageWithFallback
                  src={recipe.author.image}
                  alt={recipe.author.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-foreground flex items-center gap-1">
                    {recipe.author.name}
                    <ChefHat className="w-4 h-4 text-primary" />
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {recipe.author.bio}
                  </p>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                View Profile
              </Button>
            </Card>

            {/* Ingredients */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Ingredients
              </h2>
              <div className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <label
                    key={index}
                    className="flex items-center gap-3 cursor-pointer hover:bg-accent rounded-lg p-2 -m-2 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={checkedIngredients.has(index)}
                      onChange={() => toggleIngredient(index)}
                      className="rounded border-border"
                    />
                    <div className="flex-1">
                      <span
                        className={`text-sm ${
                          checkedIngredients.has(index)
                            ? "line-through text-muted-foreground"
                            : "text-foreground"
                        }`}
                      >
                        <span className="font-medium">{ingredient.amount}</span>{" "}
                        {ingredient.item}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </Card>

            {/* Nutrition */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Nutrition per Serving
              </h2>
              <div className="space-y-3">
                {recipe.nutrition.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-medium text-foreground">
                      {item.value}
                      {item.unit}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Tags */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {recipe.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
