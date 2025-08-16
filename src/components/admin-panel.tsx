
'use client';
import React, { useState } from 'react';
import { useAdmin } from '@/context/admin-context';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";

const AdminPanel = () => {
  const { isOpen, setOpen, isAuthenticated, setAuthenticated } = useAdmin();
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const handlePasswordSubmit = () => {
    if (password === '911hyrex') {
      setAuthenticated(true);
      toast({ title: "Success", description: "Authenticated successfully." });
    } else {
      toast({ variant: "destructive", title: "Error", description: "Incorrect password." });
    }
    setPassword('');
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
        setOpen(false);
        // Optionally reset authentication state when dialog is closed
        // setAuthenticated(false);
    } else {
        setOpen(true);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isAuthenticated ? 'Admin Panel' : 'Admin Access'}</DialogTitle>
          <DialogDescription>
            {isAuthenticated ? 'Welcome, Admin. Make changes to the site here.' : 'Please enter the password to access the admin panel.'}
          </DialogDescription>
        </DialogHeader>
        
        {!isAuthenticated ? (
          <div className="space-y-4 py-4">
            <Input 
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handlePasswordSubmit()}
            />
            <Button onClick={handlePasswordSubmit} className="w-full">Login</Button>
          </div>
        ) : (
          <div className="py-4">
            <p>Admin features will be shown here.</p>
            <Button variant="outline" className="mt-4" onClick={() => setAuthenticated(false)}>Logout</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AdminPanel;
