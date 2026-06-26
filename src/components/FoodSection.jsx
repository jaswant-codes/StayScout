import React from 'react';
import { Utensils, Coffee, Check, X, Clock, Flame } from 'lucide-react';

const FoodSection = ({ food }) => {
  if (!food) return null;

  return (
    <div className="bg-dark-800 rounded-xl p-6 border border-border">
      <h3 className="text-xl font-semibold text-text-primary mb-6 flex items-center gap-2">
        <Utensils className="w-5 h-5 text-accent-500" />
        Food & Kitchen
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-text-muted uppercase tracking-wider">Dietary Options</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className={`p-1.5 rounded-full ${food.veg ? 'bg-success/10 text-success' : 'bg-dark-700 text-text-muted'}`}>
                {food.veg ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
              </div>
              <span className={food.veg ? 'text-text-secondary' : 'text-text-muted line-through'}>Vegetarian</span>
            </div>
            <div className="flex items-center gap-3">
              <div className={`p-1.5 rounded-full ${food.nonVeg ? 'bg-success/10 text-success' : 'bg-dark-700 text-text-muted'}`}>
                {food.nonVeg ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
              </div>
              <span className={food.nonVeg ? 'text-text-secondary' : 'text-text-muted line-through'}>Non-Vegetarian</span>
            </div>
          </div>
          
          <h4 className="text-sm font-medium text-text-muted uppercase tracking-wider pt-2">Kitchen Access</h4>
          <div className="flex items-center gap-3">
            <div className={`p-1.5 rounded-full ${food.kitchen ? 'bg-success/10 text-success' : 'bg-dark-700 text-text-muted'}`}>
              <Flame className="w-4 h-4" />
            </div>
            <span className="text-text-secondary">{food.kitchen ? 'Self-cooking allowed' : 'No kitchen access'}</span>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium text-text-muted uppercase tracking-wider">Meals Provided</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className={`p-1.5 rounded-full ${food.breakfast ? 'bg-accent-500/10 text-accent-500' : 'bg-dark-700 text-text-muted'}`}>
                <Coffee className="w-4 h-4" />
              </div>
              <span className={food.breakfast ? 'text-text-secondary' : 'text-text-muted'}>Breakfast</span>
            </div>
            <div className="flex items-center gap-3">
              <div className={`p-1.5 rounded-full ${food.lunch ? 'bg-accent-500/10 text-accent-500' : 'bg-dark-700 text-text-muted'}`}>
                <Utensils className="w-4 h-4" />
              </div>
              <span className={food.lunch ? 'text-text-secondary' : 'text-text-muted'}>Lunch</span>
            </div>
            <div className="flex items-center gap-3">
              <div className={`p-1.5 rounded-full ${food.dinner ? 'bg-accent-500/10 text-accent-500' : 'bg-dark-700 text-text-muted'}`}>
                <Utensils className="w-4 h-4" />
              </div>
              <span className={food.dinner ? 'text-text-secondary' : 'text-text-muted'}>Dinner</span>
            </div>
          </div>

          {food.mealTimings && (
            <div className="pt-2">
              <div className="flex items-start gap-2 bg-dark-700/50 p-3 rounded-lg border border-border">
                <Clock className="w-4 h-4 text-accent-500 mt-0.5" />
                <div>
                  <span className="block text-sm font-medium text-text-primary mb-1">Meal Timings</span>
                  <span className="block text-sm text-text-secondary">{food.mealTimings}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {food.included !== undefined && (
        <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
          <span className="text-text-secondary">Food cost included in rent?</span>
          <span className={`font-medium ${food.included ? 'text-success' : 'text-warning'}`}>
            {food.included ? 'Yes, Included' : 'No, Extra Charges'}
          </span>
        </div>
      )}
    </div>
  );
};

export default FoodSection;
