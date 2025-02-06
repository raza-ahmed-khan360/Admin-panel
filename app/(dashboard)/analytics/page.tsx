'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { useEffect, useState } from 'react';

interface Analytics {
  _id: string;
  metric: string;
  value: number;
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<Analytics[]>([]);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const response = await fetch('/api/analytics');
        const data = await response.json();
        setAnalytics(data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      }
    }

    fetchAnalytics();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analytics</CardTitle>
        <CardDescription>View analytics and performance metrics.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="analytics-list">
          <h2 className="text-xl font-semibold mb-4">Analytics Data</h2>
          <ul>
            {analytics.map((item) => (
              <li key={item._id}>
                <h3>{item.metric}</h3>
                <p>{item.value}</p>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}