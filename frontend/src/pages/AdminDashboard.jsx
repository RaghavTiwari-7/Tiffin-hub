import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";
import {
  mockUsers,
  mockTiffinServices,
  mockOrders,
  platformStats,
} from "@/data/mockData";

import {
  Users,
  ChefHat,
  Package,
  IndianRupee,
  TrendingUp,
  Shield,
  Check,
  X,
  Search,
  Eye,
  Trash2,
  BarChart3,
} from "lucide-react";

function AdminDashboard() {
  const { user } = useAuth();

  const [searchUsers, setSearchUsers] = useState("");
  const [searchOwners, setSearchOwners] = useState("");

  const users = mockUsers.filter((u) => u.role === "user");
  const owners = mockUsers.filter((u) => u.role === "owner");

  const pendingOwners = [
    {
      id: "p1",
      name: "Anita Desai",
      email: "anita@example.com",
      kitchen: "Anita's Kitchen",
      location: "Malad",
    },
    {
      id: "p2",
      name: "Ravi Kumar",
      email: "ravi@example.com",
      kitchen: "Ravi's Tiffin",
      location: "Goregaon",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard 🛡️</h1>
          <p className="text-muted-foreground">
            Manage platform, users, and monitor activities
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              Users: {platformStats.totalUsers}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              Owners: {platformStats.totalOwners}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              Orders: {platformStats.totalOrders}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              Revenue: ₹{platformStats.revenue}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              Listings: {platformStats.activeListings}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              Pending: {platformStats.pendingApprovals}
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="owners">Owners</TabsTrigger>
            <TabsTrigger value="listings">Listings</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>

          {/* USERS */}
          <TabsContent value="users">
            <Input
              placeholder="Search users..."
              value={searchUsers}
              onChange={(e) => setSearchUsers(e.target.value)}
            />

            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell>{u.name}</TableCell>
                      <TableCell>{u.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* OWNERS */}
          <TabsContent value="owners">
            <Input
              placeholder="Search owners..."
              value={searchOwners}
              onChange={(e) => setSearchOwners(e.target.value)}
            />

            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Owner</TableHead>
                    <TableHead>Kitchen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTiffinServices.map((t) => (
                    <TableRow key={t.id}>
                      <TableCell>{t.ownerName}</TableCell>
                      <TableCell>{t.name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}

export default AdminDashboard;
