/** @format */

import { useState } from "react";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  Clock,
  Users,
  ShoppingCart,
  Download,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import React from "react";

export function MealPlanner({ onViewRecipe }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [mealPlan, setMealPlan] = useState({});
  const [showAddRecipe, setShowAddRecipe] = useState(null);

  const mealTypes = [
    {
      id: "breakfast",
      name: "Breakfast",
      color:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/50 dark:text-yellow-300",
    },
    {
      id: "lunch",
      name: "Lunch",
      color:
        "bg-green-100 text-green-800 dark:bg-green-950/50 dark:text-green-300",
    },
    {
      id: "dinner",
      name: "Dinner",
      color: "bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300",
    },
    {
      id: "snack",
      name: "Snack",
      color:
        "bg-purple-100 text-purple-800 dark:bg-purple-950/50 dark:text-purple-300",
    },
  ];

  const sampleRecipes = [
    {
      id: "1",
      title: "Avocado Toast with Eggs",
      image:
        "https://images.unsplash.com/photo-1626026671041-ee71c3bbf735?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVha2Zhc3QlMjBmb29kJTIwY2F0ZWdvcnl8ZW58MXx8fHwxNzU1MDM0OTc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      cookTime: "10 mins",
      servings: 1,
      mealType: "breakfast",
    },
    {
      id: "2",
      title: "Mediterranean Quinoa Bowl",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdhbiUyMGhlYWx0aHklMjBmb29kJTIwY2F0ZWdvcnl8ZW58MXx8fHwxNzU1MDM0OTc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      cookTime: "15 mins",
      servings: 2,
      mealType: "lunch",
    },
    {
      id: "3",
      title: "Grilled Salmon with Vegetables",
      image:
        "https://images.unsplash.com/photo-1673081760594-828ed9f8d0f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaW5uZXIlMjBmb29kJTIwY2F0ZWdvcnl8ZW58MXx8fHwxNzU1MDM0OTc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      cookTime: "25 mins",
      servings: 4,
      mealType: "dinner",
    },
  ];

  const getWeekDays = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const addRecipeToMealPlan = (date, mealType, recipe) => {
    setMealPlan((prev) => ({
      ...prev,
      [date]: {
        ...prev[date],
        [mealType]: recipe,
      },
    }));
    setShowAddRecipe(null);
  };

  const removeRecipeFromMealPlan = (date, mealType) => {
    setMealPlan((prev) => ({
      ...prev,
      [date]: {
        ...prev[date],
        [mealType]: null,
      },
    }));
  };

  const generateShoppingList = () => {
    // Mock shopping list generation
    const ingredients = [
      "Avocados (2)",
      "Eggs (6)",
      "Whole grain bread (1 loaf)",
      "Quinoa (1 cup)",
      "Cherry tomatoes (1 container)",
      "Salmon fillets (4)",
      "Mixed vegetables (2 bags)",
      "Olive oil",
      "Lemon (2)",
      "Feta cheese (1 container)",
    ];

    alert(
      `Shopping List Generated!\n\n${ingredients.join(
        "\n"
      )}\n\nThis would normally download as a PDF.`
    );
  };

  const weekDays = getWeekDays();

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Meal Planner
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Plan your weekly meals, generate shopping lists, and stay organized
            with your cooking
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => {
                const newDate = new Date(currentDate);
                newDate.setDate(currentDate.getDate() - 7);
                setCurrentDate(newDate);
              }}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous Week
            </Button>

            <h2 className="text-2xl font-semibold text-foreground">
              {weekDays[0].toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </h2>

            <Button
              variant="outline"
              onClick={() => {
                const newDate = new Date(currentDate);
                newDate.setDate(currentDate.getDate() + 7);
                setCurrentDate(newDate);
              }}
            >
              Next Week
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={generateShoppingList}
              className="bg-secondary hover:bg-secondary-dark text-secondary-foreground"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Shopping List
            </Button>

            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 mb-8">
          {weekDays.map((day, dayIndex) => {
            const dateKey = formatDate(day);
            const isToday = formatDate(new Date()) === dateKey;

            return (
              <Card
                key={dayIndex}
                className={`p-4 bg-card border ${
                  isToday ? "border-primary shadow-lg" : "border-border"
                } transition-all duration-300`}
              >
                <div className="text-center mb-4">
                  <h3 className="font-semibold text-foreground">
                    {day.toLocaleDateString("en-US", { weekday: "short" })}
                  </h3>
                  <p
                    className={`text-2xl font-bold ${
                      isToday ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {day.getDate()}
                  </p>
                </div>

                <div className="space-y-3">
                  {mealTypes.map((mealType) => {
                    const plannedMeal = mealPlan[dateKey]?.[mealType.id];

                    return (
                      <div key={mealType.id} className="min-h-[80px]">
                        <Badge
                          className={`${mealType.color} text-xs mb-2 w-full justify-center`}
                        >
                          {mealType.name}
                        </Badge>

                        {plannedMeal ? (
                          <div className="group relative">
                            <div className="relative overflow-hidden rounded-lg">
                              <ImageWithFallback
                                src={plannedMeal.image}
                                alt={plannedMeal.title}
                                className="w-full h-16 object-cover"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200"></div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  removeRecipeFromMealPlan(dateKey, mealType.id)
                                }
                                className="absolute top-1 right-1 w-6 h-6 p-0 bg-destructive/80 text-white hover:bg-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                            <div className="mt-1">
                              <p className="text-xs font-medium text-foreground line-clamp-1">
                                {plannedMeal.title}
                              </p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                <span>{plannedMeal.cookTime}</span>
                              </div>
                            </div>
                            <Button
                              onClick={() => onViewRecipe(plannedMeal.id)}
                              className="w-full mt-2 h-8 text-xs gradient-primary text-white"
                            >
                              View Recipe
                            </Button>
                          </div>
                        ) : (
                          <Button
                            variant="outline"
                            onClick={() =>
                              setShowAddRecipe({
                                date: dateKey,
                                mealType: mealType.id,
                              })
                            }
                            className="w-full h-16 border-dashed border-2 border-muted-foreground/30 hover:border-primary hover:text-primary transition-all duration-200"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add {mealType.name}
                          </Button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-6 text-center bg-card">
            <h3 className="text-2xl font-bold text-primary mb-2">
              {Object.values(mealPlan).reduce(
                (count, day) =>
                  count +
                  Object.values(day).filter((meal) => meal !== null).length,
                0
              )}
            </h3>
            <p className="text-muted-foreground">Meals Planned</p>
          </Card>

          <Card className="p-6 text-center bg-card">
            <h3 className="text-2xl font-bold text-secondary mb-2">7</h3>
            <p className="text-muted-foreground">Days Covered</p>
          </Card>

          <Card className="p-6 text-center bg-card">
            <h3 className="text-2xl font-bold text-orange-500 mb-2">12</h3>
            <p className="text-muted-foreground">Shopping Items</p>
          </Card>

          <Card className="p-6 text-center bg-card">
            <h3 className="text-2xl font-bold text-purple-500 mb-2">3.5h</h3>
            <p className="text-muted-foreground">Total Cook Time</p>
          </Card>
        </div>
      </div>

      {/* Add Recipe Modal */}
      {showAddRecipe && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto bg-background">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-foreground">
                  Add Recipe for {showAddRecipe.mealType}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAddRecipe(null)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sampleRecipes
                  .filter(
                    (recipe) => recipe.mealType === showAddRecipe.mealType
                  )
                  .map((recipe) => (
                    <Card
                      key={recipe.id}
                      className="overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-200 bg-card"
                      onClick={() =>
                        addRecipeToMealPlan(
                          showAddRecipe.date,
                          showAddRecipe.mealType,
                          recipe
                        )
                      }
                    >
                      <ImageWithFallback
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="font-semibold text-foreground mb-2 line-clamp-1">
                          {recipe.title}
                        </h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{recipe.cookTime}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            <span>{recipe.servings}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>

              {sampleRecipes.filter(
                (recipe) => recipe.mealType === showAddRecipe.mealType
              ).length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    No recipes available for this meal type.
                  </p>
                  <Button className="mt-4 gradient-primary text-white">
                    Browse More Recipes
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
