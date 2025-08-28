/** @format */

import { Users, Award, Globe, Heart } from "lucide-react";
import { Card } from "../components/card";
import { ImageWithFallback } from "../components/ImageWithFallback";

export function AboutPage() {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616c125d61c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NTUwMzUyOTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      bio: "Passionate food lover with 10+ years in culinary education",
    },
    {
      name: "Mark Chen",
      role: "Head Chef",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzU1MDM1Mjk2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      bio: "Award-winning chef specializing in international cuisine",
    },
    {
      name: "Lisa Rodriguez",
      role: "Nutritionist",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHNtaWxpbmd8ZW58MXx8fHwxNzU1MDM1Mjk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      bio: "Registered dietitian helping create healthy, delicious recipes",
    },
  ];

  const stats = [
    { icon: Users, label: "Active Users", value: "50,000+" },
    { icon: Award, label: "Recipes", value: "10,000+" },
    { icon: Globe, label: "Countries", value: "25" },
    { icon: Heart, label: "Meals Cooked", value: "1M+" },
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold text-foreground mb-6">
            About RecipeFinder
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're passionate about making cooking accessible, enjoyable, and
            delicious for everyone. Our mission is to connect food lovers with
            amazing recipes from around the world, while providing the tools and
            guidance to become better home cooks.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat) => (
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

        {/* Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                RecipeFinder was born from a simple idea: cooking should be
                accessible to everyone. Founded in 2020, we started as a small
                team of food enthusiasts who wanted to create a platform where
                home cooks could discover, share, and learn from each other.
              </p>
              <p>
                Today, we've grown into a global community of food lovers,
                professional chefs, and home cooking enthusiasts. Our platform
                features thousands of tested recipes, detailed instructions, and
                helpful tools to make your cooking journey enjoyable and
                successful.
              </p>
              <p>
                We believe that great food brings people together, and we're
                proud to be part of countless family dinners, celebrations, and
                everyday meals around the world.
              </p>
            </div>
          </div>
          <div>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1556909114-c3d8d17888b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwY29va2luZyUyMGZhbWlseXxlbnwxfHx8fDE3NTUwMzUyOTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Cooking together"
              className="rounded-lg shadow-lg w-full h-80 object-cover"
            />
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Meet Our Team
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our diverse team of culinary experts, nutritionists, and food
              lovers work together to bring you the best recipes and cooking
              experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.name} className="p-6 text-center">
                <ImageWithFallback
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.bio}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Values */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do at RecipeFinder
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Quality First
              </h3>
              <p className="text-muted-foreground">
                Every recipe is carefully tested and reviewed to ensure the best
                cooking experience.
              </p>
            </Card>

            <Card className="p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Community
              </h3>
              <p className="text-muted-foreground">
                We foster a supportive community where everyone can learn and
                share their culinary journey.
              </p>
            </Card>

            <Card className="p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Accessibility
              </h3>
              <p className="text-muted-foreground">
                Cooking should be accessible to everyone, regardless of skill
                level or dietary needs.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
