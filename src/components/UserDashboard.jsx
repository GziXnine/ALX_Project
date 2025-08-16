/** @format */

import {
  User,
  Heart,
  BookOpen,
  Calendar,
  Settings,
  Award,
  TrendingUp,
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { RecipeCard } from "./RecipeCard";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import React from "react";

export function UserDashboard({ onViewRecipe }) {
  // Mock user data
  const user = {
    name: "John Smith",
    email: "john@example.com",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzU1MDM1Mjk2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    memberSince: "2023-03-15",
    totalRecipes: 24,
    favoriteRecipes: 42,
    mealsCooked: 156,
  };

  const savedRecipes = [
    {
      id: "1",
      title: "Classic Chicken Parmesan",
      category: "Main Course",
      cuisine: "Italian",
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwcGFybWVzYW58ZW58MXx8fHwxNzU1MDM1MjMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      cookTime: "45 mins",
      servings: 4,
      rating: 4.7,
      difficulty: "Medium",
    },
    {
      id: "2",
      title: "Chocolate Chip Cookies",
      category: "Dessert",
      cuisine: "American",
      image:
        "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBjaGlwJTIwY29va2llc3xlbnwxfHx8fDE3NTUwMzUxMjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      cookTime: "25 mins",
      servings: 12,
      rating: 4.9,
      difficulty: "Easy",
    },
  ];

  const achievements = [
    {
      name: "First Recipe",
      description: "Saved your first recipe",
      icon: BookOpen,
      unlocked: true,
    },
    {
      name: "Home Chef",
      description: "Cooked 50 recipes",
      icon: Award,
      unlocked: true,
    },
    {
      name: "Recipe Collector",
      description: "Saved 25+ recipes",
      icon: Heart,
      unlocked: true,
    },
    {
      name: "Master Cook",
      description: "Cooked 100 recipes",
      icon: TrendingUp,
      unlocked: false,
    },
  ];

  const cookingStats = [
    { label: "Recipes Saved", value: user.favoriteRecipes, icon: Heart },
    { label: "Meals Cooked", value: user.mealsCooked, icon: Calendar },
    { label: "Favorite Cuisine", value: "Italian", icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container">
        {/* Profile Header */}
        <Card className="p-6 mb-8">
          <div className="flex items-center gap-6">
            <ImageWithFallback
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                {user.name}
              </h1>
              <p className="text-muted-foreground mb-3">{user.email}</p>
              <p className="text-sm text-muted-foreground">
                Member since {new Date(user.memberSince).toLocaleDateString()}
              </p>
            </div>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {cookingStats.map((stat) => (
            <Card key={stat.label} className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {stat.value}
              </h3>
              <p className="text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="saved" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="saved">Saved Recipes</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="saved" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">
                Your Saved Recipes
              </h2>
              <p className="text-muted-foreground">
                {user.favoriteRecipes} recipes saved
              </p>
            </div>

            {savedRecipes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedRecipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onViewRecipe={onViewRecipe}
                    size="medium"
                  />
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No saved recipes yet
                </h3>
                <p className="text-muted-foreground mb-6">
                  Start exploring recipes and save your favorites to see them
                  here
                </p>
                <Button>Browse Recipes</Button>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <h2 className="text-xl font-semibold text-foreground">
              Your Achievements
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement) => (
                <Card
                  key={achievement.name}
                  className={`p-6 ${achievement.unlocked ? "" : "opacity-50"}`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        achievement.unlocked
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <achievement.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">
                        {achievement.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {achievement.description}
                      </p>
                    </div>
                    {achievement.unlocked && (
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        Unlocked
                      </Badge>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <h2 className="text-xl font-semibold text-foreground">
              Recent Activity
            </h2>

            <div className="space-y-4">
              <Card className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 text-green-600 dark:text-green-300" />
                  </div>
                  <div className="flex-1">
                    <p className="text-foreground">
                      Saved <strong>Chocolate Chip Cookies</strong>
                    </p>
                    <p className="text-sm text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div className="flex-1">
                    <p className="text-foreground">
                      Cooked <strong>Spaghetti Carbonara</strong>
                    </p>
                    <p className="text-sm text-muted-foreground">1 day ago</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                    <Award className="w-4 h-4 text-orange-600 dark:text-orange-300" />
                  </div>
                  <div className="flex-1">
                    <p className="text-foreground">
                      Earned <strong>Home Chef</strong> achievement
                    </p>
                    <p className="text-sm text-muted-foreground">3 days ago</p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
