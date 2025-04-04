"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authService } from "../services/auth.service";
import { courseService, CourseData } from "../services/course.service";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if user is logged in
        const userData = await authService.getProfile();
        setUser(userData);

        // Fetch courses
        const coursesData = await courseService.getAllCourses();
        setCourses(coursesData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load dashboard data");

        // If unauthorized, redirect to login
        if (err.response?.status === 401) {
          router.push("/auth/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  // Handle logout
  const handleLogout = () => {
    authService.logout();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-8 max-w-md bg-white rounded-lg shadow-lg">
          <p className="text-red-600 mb-4">{error}</p>
          <Link
            href="/auth/login"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">
            LearnX Dashboard
          </h1>
          <div className="flex items-center">
            <div className="mr-4 text-sm text-gray-600">
              Welcome, <span className="font-medium">{user?.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded-md"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Role-specific section */}
        {user?.role === "instructor" && (
          <div className="mb-8 bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">Instructor Dashboard</h2>
            <p className="mb-4">
              Manage your courses and track student progress.
            </p>
            <Link
              href="/dashboard/courses/create"
              className="inline-block px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-gray-100"
            >
              Create New Course
            </Link>
          </div>
        )}

        {user?.role === "student" && (
          <div className="mb-8 bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">Student Dashboard</h2>
            <p className="mb-4">Track your progress and continue learning.</p>
            <Link
              href="/dashboard/courses"
              className="inline-block px-4 py-2 bg-white text-purple-600 rounded-md hover:bg-gray-100"
            >
              Browse All Courses
            </Link>
          </div>
        )}

        {user?.role === "admin" && (
          <div className="mb-8 bg-gradient-to-r from-gray-700 to-gray-900 text-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">Admin Dashboard</h2>
            <p className="mb-4">
              Manage users, courses, and platform settings.
            </p>
            <div className="flex space-x-4">
              <Link
                href="/dashboard/users"
                className="inline-block px-4 py-2 bg-white text-gray-800 rounded-md hover:bg-gray-100"
              >
                Manage Users
              </Link>
              <Link
                href="/dashboard/courses/manage"
                className="inline-block px-4 py-2 bg-white text-gray-800 rounded-md hover:bg-gray-100"
              >
                Manage Courses
              </Link>
            </div>
          </div>
        )}

        {/* Courses section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {user?.role === "instructor" ? "Your Courses" : "Available Courses"}
          </h2>

          {courses.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <p className="text-gray-500">
                {user?.role === "instructor"
                  ? "You haven't created any courses yet."
                  : "No courses available at the moment."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  {course.thumbnail ? (
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {course.description || "No description available"}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {course.level || "Beginner"}
                      </span>
                      <span className="font-semibold text-gray-900">
                        $
                        {typeof course.price === "number"
                          ? course.price.toFixed(2)
                          : parseFloat(course.price || "0").toFixed(2)}
                      </span>
                    </div>
                    <Link
                      href={`/dashboard/courses/${course.id}`}
                      className="mt-4 block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      {user?.role === "instructor"
                        ? "Edit Course"
                        : "View Course"}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {user?.role === "instructor"
                ? "Total Students"
                : "Enrolled Courses"}
            </h3>
            <p className="text-3xl font-bold text-blue-600">0</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {user?.role === "instructor"
                ? "Total Courses"
                : "Completed Courses"}
            </h3>
            <p className="text-3xl font-bold text-green-600">
              {user?.role === "instructor" ? courses.length : 0}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {user?.role === "instructor"
                ? "Total Revenue"
                : "Overall Progress"}
            </h3>
            <p className="text-3xl font-bold text-purple-600">
              {user?.role === "instructor" ? "$0" : "0%"}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
