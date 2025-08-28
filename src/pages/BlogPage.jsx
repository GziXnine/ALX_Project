/** @format */

import React from "react";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Card } from "../components/card";
import { Badge } from "../components/badge";
import { Button } from "../components/button";
import { ImageWithFallback } from "../components/ImageWithFallback";

export function BlogPage({ onViewBlog }) {
  const blogPosts = [
    {
      id: "1",
      title: "10 Essential Cooking Tips for Beginners",
      excerpt:
        "Starting your cooking journey? These fundamental tips will set you up for success in the kitchen.",
      image:
        "https://images.unsplash.com/photo-1556909114-c3d8d17888b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwY29va2luZyUyMGZhbWlseXxlbnwxfHx8fDE3NTUwMzUyOTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      author: "Sarah Johnson",
      date: "2024-01-15",
      category: "Tips & Tricks",
      readTime: "5 min read",
    },
    {
      id: "2",
      title: "The Art of Meal Planning: Save Time and Money",
      excerpt:
        "Learn how to plan your meals effectively to reduce waste, save money, and eat healthier.",
      image:
        "https://images.unsplash.com/photo-1498837167922-ddd27525d352?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWFsJTIwcGxhbm5pbmd8ZW58MXx8fHwxNzU1MDM1MzE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      author: "Mark Chen",
      date: "2024-01-12",
      category: "Meal Planning",
      readTime: "8 min read",
    },
    {
      id: "3",
      title: "Seasonal Cooking: Making the Most of Winter Ingredients",
      excerpt:
        "Discover how to use winter produce to create warming, nutritious meals for the cold season.",
      image:
        "https://images.unsplash.com/photo-1635253893163-92c0b2a1a66d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWFzb25hbCUyMGF1dHVtbiUyMGZvb2QlMjBpbmdyZWRpZW50c3xlbnwxfHx8fDE3NTUwMzQ5ODB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      author: "Lisa Rodriguez",
      date: "2024-01-10",
      category: "Seasonal",
      readTime: "6 min read",
    },
    {
      id: "4",
      title: "Plant-Based Protein: Complete Guide for Vegetarians",
      excerpt:
        "Everything you need to know about getting complete protein from plant-based sources.",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdhbiUyMGhlYWx0aHklMjBmb29kJTIwY2F0ZWdvcnl8ZW58MXx8fHwxNzU1MDM0OTc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      author: "Lisa Rodriguez",
      date: "2024-01-08",
      category: "Nutrition",
      readTime: "10 min read",
    },
    {
      id: "5",
      title: "Kitchen Equipment Guide: Must-Have Tools for Home Cooks",
      excerpt:
        "Building your kitchen arsenal? Here are the essential tools every home cook should have.",
      image:
        "https://images.unsplash.com/photo-1556909114-c3d8d17888b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwY29va2luZyUyMGZhbWlseXxlbnwxfHx8fDE3NTUwMzUyOTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      author: "Mark Chen",
      date: "2024-01-05",
      category: "Equipment",
      readTime: "7 min read",
    },
    {
      id: "6",
      title: "International Flavors: Exploring Global Spice Blends",
      excerpt:
        "Take your taste buds on a journey around the world with these authentic spice combinations.",
      image:
        "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGljZXMlMjBpbnRlcm5hdGlvbmFsfGVufDF8fHx8MTc1NTAzNTMxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      author: "Sarah Johnson",
      date: "2024-01-03",
      category: "International",
      readTime: "9 min read",
    },
  ];

  const categories = [
    "All",
    "Tips & Tricks",
    "Meal Planning",
    "Nutrition",
    "Seasonal",
    "Equipment",
    "International",
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Cooking Blog
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover cooking tips, techniques, and inspiration from our team of
            culinary experts
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={category === "All" ? "default" : "secondary"}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Featured Post */}
        <Card className="mb-12 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <ImageWithFallback
              src={blogPosts[0].image}
              alt={blogPosts[0].title}
              className="w-full h-64 lg:h-full object-cover"
            />
            <div className="p-8 flex flex-col justify-center">
              <Badge className="mb-3 w-fit bg-primary/10 text-primary border-primary/20">
                Featured Post
              </Badge>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {blogPosts[0].title}
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {blogPosts[0].excerpt}
              </p>

              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{blogPosts[0].author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(blogPosts[0].date).toLocaleDateString()}
                  </span>
                </div>
                <span>{blogPosts[0].readTime}</span>
              </div>

              <Button
                onClick={() => onViewBlog(blogPosts[0].id)}
                className="w-fit"
              >
                Read Article
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post) => (
            <Card
              key={post.id}
              className="overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              <ImageWithFallback
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary" className="text-xs">
                    {post.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {post.readTime}
                  </span>
                </div>

                <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <User className="w-3 h-3" />
                    <span>{post.author}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                </div>

                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => onViewBlog(post.id)}
                >
                  Read More
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
