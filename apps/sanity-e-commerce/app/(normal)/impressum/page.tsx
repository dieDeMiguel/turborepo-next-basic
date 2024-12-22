import { InfoIcon, CreditCard } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Alert, AlertDescription, AlertTitle } from '@repo/ui/card';

export default function Impressum() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Impressum</CardTitle>
          <CardDescription>Legal Disclaimer and Demo Information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>Demo Project</AlertTitle>
            <AlertDescription>
              This e-commerce site is a demonstration project showcasing the integration of Sanity, Clerk, and Stripe. It is not a real e-commerce platform.
            </AlertDescription>
          </Alert>

          <p className="text-sm text-muted-foreground">
            No actual charges will be made to your credit card during the checkout process. This site is purely for demonstration and educational purposes.
          </p>

          <div>
            <h2 className="text-xl font-semibold mb-2">Test Payment Information</h2>
            <p className="text-sm text-muted-foreground mb-2">For testing the checkout process, please use the following details:</p>
            <Card>
              <CardContent className="pt-6">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CreditCard className="h-4 w-4 mr-2" />
                    <span className="font-medium">Card Number:</span>
                    <span className="ml-2">4242 4242 4242 4242</span>
                  </li>
                  <li className="flex items-center">
                    <CreditCard className="h-4 w-4 mr-2" />
                    <span className="font-medium">Expiration Date:</span>
                    <span className="ml-2">Any future date</span>
                  </li>
                  <li className="flex items-center">
                    <CreditCard className="h-4 w-4 mr-2" />
                    <span className="font-medium">CVC:</span>
                    <span className="ml-2">Any 3 digits</span>
                  </li>
                  <li className="flex items-center">
                    <CreditCard className="h-4 w-4 mr-2" />
                    <span className="font-medium">Name:</span>
                    <span className="ml-2">Any name</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <p className="text-sm text-muted-foreground">
            By using this demo, you acknowledge that no real transactions will occur and no personal information will be stored or processed.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

