/** @format */

import {
  Search,
  Clock,
  Users,
  Star,
  ChefHat,
  BookOpen,
  Heart,
  TrendingUp,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { RecipeCard } from "../components/RecipeCard";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState } from "react";

export function LandingPage({ onSearch, onViewRecipe, onShowAIModal }) {
  const [searchQuery, setSearchQuery] = useState("");

  const featuredRecipes = [
    {
      id: "1",
      title: "Classic Spaghetti Carbonara",
      category: "Main Course",
      cuisine: "Italian",
      image:
        "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFnaGV0dGklMjBjYXJib25hcmF8ZW58MXx8fHwxNzU1MDM1MTI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      cookTime: "20 mins",
      servings: 4,
      rating: 4.8,
      difficulty: "Medium",
      description:
        "Traditional Italian pasta dish with eggs, cheese, and pancetta",
    },
    {
      id: "2",
      title: "Grilled Chicken Salad",
      category: "Healthy",
      cuisine: "Mediterranean",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdhbiUyMGhlYWx0aHklMjBmb29kJTIwY2F0ZWdvcnl8ZW58MXx8fHwxNzU1MDM0OTc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      cookTime: "15 mins",
      servings: 2,
      rating: 4.6,
      difficulty: "Easy",
      description: "Fresh mixed greens with grilled chicken and vegetables",
    },
    {
      id: "3",
      title: "Chocolate Chip Cookies",
      category: "Dessert",
      cuisine: "American",
      image:
        "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBjaGlwJTIwY29va2llc3xlbnwxfHx8fDE3NTUwMzUxMjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      cookTime: "25 mins",
      servings: 12,
      rating: 4.9,
      difficulty: "Easy",
      description: "Classic homemade chocolate chip cookies",
    },
  ];

  const categories = [
    {
      id: "breakfast",
      name: "Breakfast",
      image:
        "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVha2Zhc3R8ZW58MXx8fHwxNzU1MDM1MTI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      count: 245,
    },
    {
      id: "lunch",
      name: "Lunch",
      image:
        "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdW5jaHxlbnwxfHx8fDE3NTUwMzUxMzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      count: 312,
    },
    {
      id: "dinner",
      name: "Dinner",
      image:
        "https://images.unsplash.com/photo-1546833999-b9f581a1996d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaW5uZXJ8ZW58MXx8fHwxNzU1MDM1MTMxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      count: 428,
    },
    {
      id: "dessert",
      name: "Desserts",
      image:
        "https://images.unsplash.com/photo-1551024506-0bccd828d307?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNzZXJ0fGVufDF8fHx8MTc1NTAzNTEzMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      count: 186,
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-muted via-background to-muted py-20 lg:py-32 overflow-hidden min-h-screen">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-secondary rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-accent rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>

        <div className="container relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-2 rounded-full mb-8">
            <ChefHat className="w-4 h-4" />
            Welcome to RecipeFinder
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Discover Amazing
            <span className="text-primary block lg:inline lg:ml-4">
              Recipes
            </span>
          </h1>

          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            From quick weeknight dinners to gourmet weekend projects. Find
            thousands of tested recipes from passionate cooks around the world.
          </p>

          {/* Enhanced Search Form */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
              <div className="relative flex items-center bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
                <div className="relative flex-1">
                  <Input
                    type="text"
                    placeholder="What would you like to cook today?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-0 bg-transparent text-lg px-6 py-6 pl-14 focus:ring-0 focus-visible:ring-0"
                  />
                  <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                </div>
                <Button
                  type="submit"
                  disabled={!searchQuery.trim()}
                  className="m-2 px-8 py-4 text-lg font-semibold rounded-xl"
                >
                  Search Recipes
                </Button>
              </div>
            </div>
          </form>

          {/* Popular Terms */}
          <div className="flex flex-wrap justify-center items-center gap-3 mb-16">
            <span className="text-muted-foreground font-medium">
              Trending searches:
            </span>
            {[
              { term: "Pasta", icon: "🍝" },
              { term: "Chicken", icon: "🍗" },
              { term: "Vegetarian", icon: "🥗" },
              { term: "Quick & Easy", icon: "⚡" },
              { term: "Desserts", icon: "🍰" },
            ].map(({ term, icon }) => (
              <button
                key={term}
                onClick={() => onSearch(term)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-card hover:bg-accent border border-border rounded-xl text-sm font-medium text-foreground hover:text-primary transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md"
              >
                <span>{icon}</span>
                {term}
              </button>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { label: "Recipes", value: "10,000+", icon: BookOpen },
              { label: "Chefs", value: "500+", icon: ChefHat },
              { label: "Countries", value: "50+", icon: TrendingUp },
              { label: "Happy Cooks", value: "100K+", icon: Heart },
            ].map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-xl mb-3">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="section-padding bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-2 rounded-full mb-6">
              <Star className="w-4 h-4" />
              Editor's Choice
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Today's Featured Recipes
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Carefully selected recipes that showcase the best of what our
              community has to offer
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-10">
            {featuredRecipes.map((recipe, index) => (
              <div
                key={recipe.id}
                className="group animate-in slide-in-from-bottom duration-700"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <RecipeCard
                  recipe={recipe}
                  onViewRecipe={onViewRecipe}
                  size="medium"
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              onClick={() => onSearch("")}
              variant="outline"
              className="px-8 py-3 text-lg font-semibold"
            >
              View All Recipes
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Explore by Category
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From hearty breakfast options to decadent desserts, find the
              perfect recipe for any occasion
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className="group cursor-pointer animate-in slide-in-from-bottom duration-700"
                style={{ animationDelay: `${index * 150}ms` }}
                onClick={() => onSearch(category.name)}
              >
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
                  <div className="relative aspect-square overflow-hidden">
                    <ImageWithFallback
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-xl font-bold mb-1">
                        {category.name}
                      </h3>
                      <p className="text-sm opacity-90">
                        {category.count} recipes
                      </p>
                    </div>
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-white text-sm font-medium">
                        {category.count}
                      </span>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Start cooking amazing meals in just three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Search & Discover",
                description:
                  "Find recipes by ingredients, cuisine, dietary needs, or cooking time. Our smart search helps you discover exactly what you're craving.",
                icon: Search,
                color: "text-blue-500",
              },
              {
                step: "02",
                title: "Choose & Plan",
                description:
                  "Browse detailed recipes with high-quality photos, ingredient lists, and step-by-step instructions from trusted chefs.",
                icon: BookOpen,
                color: "text-green-500",
              },
              {
                step: "03",
                title: "Cook & Enjoy",
                description:
                  "Follow our easy-to-understand instructions, track your progress, and create delicious meals that impress.",
                icon: ChefHat,
                color: "text-orange-500",
              },
            ].map((item, index) => (
              <div
                key={item.step}
                className="text-center group animate-in slide-in-from-bottom duration-700"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-card border-2 border-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:border-primary/50 transition-colors duration-300">
                    <item.icon className={`w-8 h-8 ${item.color}`} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground text-sm font-bold rounded-full flex items-center justify-center">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-gradient-to-br from-primary via-primary/90 to-secondary text-primary-foreground relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 border border-primary-foreground/30 rounded-full"></div>
          <div className="absolute top-20 right-20 w-24 h-24 border border-primary-foreground/30 rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 border border-primary-foreground/30 rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 border border-primary-foreground/30 rounded-full"></div>
        </div>

        <div className="container relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight">
              Ready to Start Your
              <span className="block">Culinary Journey?</span>
            </h2>
            <p className="text-xl opacity-90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join over 100,000 home cooks who trust RecipeFinder for their
              daily meal inspiration. Discover, cook, and share amazing recipes
              today.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => onSearch("")}
                className="bg-background text-foreground hover:bg-background/90 px-8 py-4 text-lg font-semibold min-w-48"
              >
                Browse All Recipes
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={onShowAIModal}
                className="border-2 border-primary-foreground text-foreground hover:bg-primary-foreground hover:text-primary px-8 py-4 text-lg font-semibold min-w-48"
              >
                Try AI Recipe Maker
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-16 pt-8 border-t border-primary-foreground/20">
              <p className="text-sm opacity-80 mb-6">
                Trusted by home cooks worldwide
              </p>
              <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                {[
                  "⭐ 4.9/5 Rating",
                  "🔒 100% Safe",
                  "📱 Mobile Friendly",
                  "🌍 Global Community",
                ].map((item) => (
                  <div key={item} className="text-sm font-medium">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
