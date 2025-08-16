/** @format */

import React from "react";
import { ArrowLeft, Calendar, User, Clock, Share2, Heart } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card } from "../components/ui/card";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function BlogDetail({ blogId, onBack }) {
  // Mock blog post data
  const post = {
    id: blogId,
    title: "10 Essential Cooking Tips for Beginners",
    content: `
      <p>Starting your culinary journey can feel overwhelming, but with these essential tips, you'll be cooking with confidence in no time. Whether you're a complete beginner or looking to improve your basic skills, these fundamentals will set you up for success.</p>
      <h2>1. Read the Entire Recipe First</h2>
      <p>Before you start cooking, read through the entire recipe from start to finish. This helps you understand the timeline, identify any special equipment you might need, and avoid surprises halfway through cooking.</p>
      <h2>2. Mise en Place - Everything in Its Place</h2>
      <p>Professional chefs swear by this French culinary phrase. Prepare and measure all your ingredients before you start cooking. Chop vegetables, measure spices, and have everything ready to go. This makes cooking much more enjoyable and reduces the chance of mistakes.</p>
      <h2>3. Invest in Good Knives</h2>
      <p>A sharp, good-quality chef's knife is one of the most important tools in your kitchen. It makes prep work faster, safer, and more enjoyable. Learn proper knife skills and keep your knives sharp.</p>
      <h2>4. Season as You Go</h2>
      <p>Don't wait until the end to season your food. Taste and adjust seasoning throughout the cooking process. This builds layers of flavor and ensures your final dish is perfectly seasoned.</p>
      <h2>5. Learn to Control Heat</h2>
      <p>Understanding heat control is crucial for good cooking. High heat for searing, medium heat for sautéing, and low heat for simmering. Don't be afraid to adjust the temperature as needed.</p>
      <h2>6. Keep It Simple</h2>
      <p>Start with simple recipes and master the basics before moving on to complex dishes. A perfectly cooked scrambled egg or a simple pasta dish can be incredibly satisfying when done well.</p>
      <h2>7. Taste, Taste, Taste</h2>
      <p>Always taste your food as you cook. This is how you learn to adjust flavors and understand how ingredients work together. Your palate is your best tool.</p>
      <h2>8. Don't Overcrowd the Pan</h2>
      <p>Give your ingredients room to cook properly. Overcrowding leads to steaming instead of browning, which affects both flavor and texture.</p>
      <h2>9. Clean as You Go</h2>
      <p>Keep your workspace clean and organized. Wash utensils and prep bowls as you finish with them. This makes cooking more pleasant and cleanup much easier.</p>
      <h2>10. Practice Patience</h2>
      <p>Good cooking takes time. Don't rush the process. Let onions properly caramelize, allow meat to rest after cooking, and give flavors time to develop.</p>
      <p>Remember, cooking is a skill that improves with practice. Don't be discouraged by mistakes – they're part of the learning process. Start with these basics, and you'll be amazed at how quickly your confidence and skills grow in the kitchen.</p>
    `,
    image:
      "https://images.unsplash.com/photo-1556909114-c3d8d17888b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwY29va2luZyUyMGZhbWlseXxlbnwxfHx8fDE3NTUwMzUyOTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    author: "Sarah Johnson",
    authorImage:
      "https://images.unsplash.com/photo-1494790108755-2616c125d61c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NTUwMzUyOTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "2024-01-15",
    category: "Tips & Tricks",
    readTime: "5 min read",
    tags: ["beginner", "cooking basics", "tips", "kitchen skills"],
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container max-w-4xl">
        {/* Back Button */}
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Button>

        {/* Article Header */}
        <article>
          <div className="mb-8">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              {post.category}
            </Badge>

            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center gap-6 text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <ImageWithFallback
                  src={post.authorImage}
                  alt={post.author}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span className="font-medium">{post.author}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>

              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 mb-8">
              <Button variant="outline" size="sm">
                <Heart className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-8">
            <ImageWithFallback
              src={post.image}
              alt={post.title}
              className="w-full h-64 lg:h-80 object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-gray max-w-none dark:prose-invert mb-8">
            <div
              className="space-y-6 text-foreground leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: post.content.replace(/\n/g, ""),
              }}
            />
          </div>

          {/* Tags */}
          <div className="mb-8">
            <h3 className="font-semibold text-foreground mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Author Bio */}
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <ImageWithFallback
                src={post.authorImage}
                alt={post.author}
                className="w-16 h-16 rounded-full object-cover flex-shrink-0"
              />
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  About {post.author}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Sarah is a professional chef and culinary instructor with over
                  10 years of experience. She specializes in making cooking
                  accessible and enjoyable for home cooks of all skill levels.
                </p>
                <Button variant="outline" size="sm">
                  View Profile
                </Button>
              </div>
            </div>
          </Card>
        </article>
      </div>
    </div>
  );
}
