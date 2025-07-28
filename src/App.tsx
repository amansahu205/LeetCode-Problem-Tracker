import React,

{useState, useEffect, useMemo}
from

'react';
import

{Search, Filter, CheckCircle2, Circle, Trophy, Target, BookOpen, TrendingUp, Calendar, Clock, Star, ChevronDown,
 ChevronRight}
from

'lucide-react';
import CompanyLogo
from

'./components/CompanyLogo';

interface
Problem
{
    id: string;
name: string;
leetcodeNumber: number | null;
difficulty: 'Easy' | 'Medium' | 'Hard';
companies: string[];
topic: string;
completed: boolean;
}

const
problemsData: Problem[] = [
                          // Basic
Maths
{id: '1', name: 'Count all Digits of a Number', leetcodeNumber: null, difficulty: 'Easy',
 companies: ['Google', 'Amazon'], topic: 'Basic Maths', completed: false},
{id: '2', name: 'Count number of odd digits in a number', leetcodeNumber: null, difficulty: 'Easy',
 companies: ['Microsoft', 'Apple'], topic: 'Basic Maths', completed: false},
{id: '3', name: 'Reverse a number', leetcodeNumber: 7, difficulty: 'Easy', companies: ['Microsoft', 'Apple'],
 topic: 'Basic Maths', completed: false},
{id: '4', name: 'Palindrome Number', leetcodeNumber: 9, difficulty: 'Easy', companies: ['Facebook', 'Google'],
 topic: 'Basic Maths', completed: false},
{id: '5', name: 'Return the Largest Digit in a Number', leetcodeNumber: null, difficulty: 'Easy',
 companies: ['Amazon', 'Microsoft'], topic: 'Basic Maths', completed: false},
{id: '6', name: 'Divisors of a Number', leetcodeNumber: null, difficulty: 'Easy', companies: ['Google', 'Facebook'],
 topic: 'Basic Maths', completed: false},
{id: '7', name: 'Factorial of a given number', leetcodeNumber: null, difficulty: 'Easy',
 companies: ['Microsoft', 'Amazon'], topic: 'Basic Maths', completed: false},
{id: '8', name: 'Check if the Number is Armstrong', leetcodeNumber: null, difficulty: 'Easy',
 companies: ['Google', 'Apple'], topic: 'Basic Maths', completed: false},
{id: '9', name: 'Check for Perfect Number', leetcodeNumber: 507, difficulty: 'Easy', companies: ['Amazon', 'Microsoft'],
 topic: 'Basic Maths', completed: false},
{id: '10', name: 'Check for Prime Number', leetcodeNumber: null, difficulty: 'Easy', companies: ['Google', 'Facebook'],
 topic: 'Basic Maths', completed: false},
{id: '11', name: 'Count of Prime Numbers till N', leetcodeNumber: 204, difficulty: 'Medium',
 companies: ['Amazon', 'Apple'], topic: 'Basic Maths', completed: false},
{id: '12', name: 'GCD of Two Numbers', leetcodeNumber: null, difficulty: 'Easy', companies: ['Microsoft', 'Google'],
 topic: 'Basic Maths', completed: false},
{id: '13', name: 'LCM of two numbers', leetcodeNumber: null, difficulty: 'Easy', companies: ['Facebook', 'Amazon'],
 topic: 'Basic Maths', completed: false},

// Basic
Arrays
{id: '14', name: 'Sum of Array Elements', leetcodeNumber: null, difficulty: 'Easy', companies: ['Google', 'Microsoft'],
 topic: 'Basic Arrays', completed: false},
{id: '15', name: 'Count of odd numbers in array', leetcodeNumber: null, difficulty: 'Easy',
 companies: ['Amazon', 'Apple'], topic: 'Basic Arrays', completed: false},
{id: '16', name: 'Check if the Array is Sorted I', leetcodeNumber: null, difficulty: 'Easy',
 companies: ['Google', 'Facebook'], topic: 'Basic Arrays', completed: false},
{id: '17', name: 'Reverse an array', leetcodeNumber: null, difficulty: 'Easy', companies: ['Microsoft', 'Amazon'],
 topic: 'Basic Arrays', completed: false},

// Basic
Hashing
{id: '18', name: 'Highest Occurring Element in an Array', leetcodeNumber: null, difficulty: 'Easy',
 companies: ['Google', 'Amazon'], topic: 'Basic Hashing', completed: false},
{id: '19', name: 'Second Highest Occurring Element', leetcodeNumber: null, difficulty: 'Easy',
 companies: ['Microsoft', 'Facebook'], topic: 'Basic Hashing', completed: false},
{id: '20', name: 'Sum of Highest and Lowest Frequency', leetcodeNumber: null, difficulty: 'Easy',
 companies: ['Apple', 'Google'], topic: 'Basic Hashing', completed: false},

// Basic
Strings
{id: '21', name: 'Reverse a String II', leetcodeNumber: 541, difficulty: 'Easy', companies: ['Amazon', 'Microsoft'],
 topic: 'Basic Strings', completed: false},
{id: '22', name: 'Palindrome Check', leetcodeNumber: 125, difficulty: 'Easy', companies: ['Facebook', 'Google'],
 topic: 'Basic Strings', completed: false},
{id: '23', name: 'Largest Odd Number in a String', leetcodeNumber: 1903, difficulty: 'Easy',
 companies: ['Google', 'Apple'], topic: 'Basic Strings', completed: false},
{id: '24', name: 'Longest Common Prefix', leetcodeNumber: 14, difficulty: 'Easy', companies: ['Amazon', 'Microsoft'],
 topic: 'Basic Strings', completed: false},
{id: '25', name: 'Isomorphic String', leetcodeNumber: 205, difficulty: 'Easy', companies: ['Facebook', 'Google'],
 topic: 'Basic Strings', completed: false},
{id: '26', name: 'Rotate String', leetcodeNumber: 796, difficulty: 'Easy', companies: ['Microsoft', 'Amazon'],
 topic: 'Basic Strings', completed: false},
{id: '27', name: 'Valid Anagram', leetcodeNumber: 242, difficulty: 'Easy', companies: ['Google', 'Facebook'],
 topic: 'Basic Strings', completed: false},
{id: '28', name: 'Sort Characters by Frequency', leetcodeNumber: 451, difficulty: 'Medium',
 companies: ['Amazon', 'Apple'], topic: 'Basic Strings', completed: false},

// Basic
Recursion
{id: '29', name: 'Sum of First N Numbers', leetcodeNumber: null, difficulty: 'Easy', companies: ['Google', 'Microsoft'],
 topic: 'Basic Recursion', completed: false},
{id: '30', name: 'Factorial of a Given Number', leetcodeNumber: null, difficulty: 'Easy',
 companies: ['Amazon', 'Facebook'], topic: 'Basic Recursion', completed: false},
{id: '31', name: 'Sum of Array Elements', leetcodeNumber: null, difficulty: 'Easy', companies: ['Apple', 'Google'],
 topic: 'Basic Recursion', completed: false},
{id: '32', name: 'Reverse a String I', leetcodeNumber: 344, difficulty: 'Easy', companies: ['Microsoft', 'Amazon'],
 topic: 'Basic Recursion', completed: false},
{id: '33', name: 'Check if String is Palindrome or Not', leetcodeNumber: null, difficulty: 'Easy',
 companies: ['Facebook', 'Google'], topic: 'Basic Recursion', completed: false},
{id: '34', name: 'Check if a Number is Prime or Not', leetcodeNumber: null, difficulty: 'Easy',
 companies: ['Amazon', 'Apple'], topic: 'Basic Recursion', completed: false},
{id: '35', name: 'Reverse an array', leetcodeNumber: null, difficulty: 'Easy', companies: ['Microsoft', 'Google'],
 topic: 'Basic Recursion', completed: false},
{id: '36', name: 'Check if the Array is Sorted II', leetcodeNumber: null, difficulty: 'Easy',
 companies: ['Facebook', 'Amazon'], topic: 'Basic Recursion', completed: false},
{id: '37', name: 'Sum of Digits in a Given Number', leetcodeNumber: null, difficulty: 'Easy',
 companies: ['Google', 'Apple'], topic: 'Basic Recursion', completed: false},
{id: '38', name: 'Fibonacci Number', leetcodeNumber: 509, difficulty: 'Easy', companies: ['Amazon', 'Microsoft'],
 topic: 'Basic Recursion', completed: false},

// Sorting
{id: '39', name: 'Selection Sort', leetcodeNumber: null, difficulty: 'Easy', companies: ['Google', 'Facebook'],
 topic: 'Sorting', completed: false},
{id: '40', name: 'Bubble Sort', leetcodeNumber: null, difficulty: 'Easy', companies: ['Microsoft', 'Amazon'],
 topic: 'Sorting', completed: false},
{id: '41', name: 'Insertion Sorting', leetcodeNumber: null, difficulty: 'Easy', companies: ['Apple', 'Google'],
 topic: 'Sorting', completed: false},
{id: '42', name: 'Merge Sorting', leetcodeNumber: null, difficulty: 'Medium', companies: ['Amazon', 'Facebook'],
 topic: 'Sorting', completed: false},
{id: '43', name: 'Quick Sorting', leetcodeNumber: null, difficulty: 'Medium', companies: ['Google', 'Microsoft'],
 topic: 'Sorting', completed: false},

// Arrays
{id: '44', name: 'Linear Search', leetcodeNumber: null, difficulty: 'Easy', companies: ['Amazon', 'Apple'],
 topic: 'Arrays', completed: false},
{id: '45', name: 'Largest Element', leetcodeNumber: null, difficulty: 'Easy', companies: ['Google', 'Microsoft'],
 topic: 'Arrays', completed: false},
{id: '46', name: 'Second Largest Element', leetcodeNumber: null, difficulty: 'Easy', companies: ['Facebook', 'Amazon'],
 topic: 'Arrays', completed: false},
{id: '47', name: 'Maximum Consecutive Ones', leetcodeNumber: 485, difficulty: 'Easy', companies: ['Google', 'Facebook'],
 topic: 'Arrays', completed: false},
{id: '48', name: 'Left Rotate Array by One', leetcodeNumber: null, difficulty: 'Easy',
 companies: ['Microsoft', 'Apple'], topic: 'Arrays', completed: false},
{id: '49', name: 'Left Rotate Array by K Places', leetcodeNumber: 189, difficulty: 'Medium',
 companies: ['Amazon', 'Google'], topic: 'Arrays', completed: false},
{id: '50', name: 'Move Zeros to End', leetcodeNumber: 283, difficulty: 'Easy', companies: ['Facebook', 'Microsoft'],
 topic: 'Arrays', completed: false},
{id: '51', name: 'Remove duplicates from sorted array', leetcodeNumber: 26, difficulty: 'Easy',
 companies: ['Google', 'Amazon'], topic: 'Arrays', completed: false},
{id: '52', name: 'Find missing number', leetcodeNumber: 268, difficulty: 'Easy', companies: ['Apple', 'Facebook'],
 topic: 'Arrays', completed: false},
{id: '53', name: 'Union of two sorted arrays', leetcodeNumber: null, difficulty: 'Easy',
 companies: ['Microsoft', 'Google'], topic: 'Arrays', completed: false},
{id: '54', name: 'Intersection of two sorted arrays', leetcodeNumber: 349, difficulty: 'Easy',
 companies: ['Amazon', 'Apple'], topic: 'Arrays', completed: false},
{id: '55', name: 'Leaders in an Array', leetcodeNumber: null, difficulty: 'Easy', companies: ['Google', 'Facebook'],
 topic: 'Arrays', completed: false},
{id: '56', name: 'Rearrange array elements by sign', leetcodeNumber: 2149, difficulty: 'Medium',
 companies: ['Microsoft', 'Amazon'], topic: 'Arrays', completed: false},
{id: '57', name: 'Print the matrix in spiral manner', leetcodeNumber: 54, difficulty: 'Medium',
 companies: ['Google', 'Apple'], topic: 'Arrays', completed: false},
{id: '58', name: 'Pascal\'s Triangle I', leetcodeNumber: 118, difficulty: 'Easy', companies: ['Facebook', 'Microsoft'],
 topic: 'Arrays', completed: false},
{id: '59', name: 'Pascal\'s Triangle II', leetcodeNumber: 119, difficulty: 'Easy', companies: ['Amazon', 'Google'],
 topic: 'Arrays', completed: false},
{id: '60', name: 'Pascal\'s Triangle III', leetcodeNumber: null, difficulty: 'Medium', companies: ['Apple', 'Facebook'],
 topic: 'Arrays', completed: false},
{id: '61', name: 'Rotate matrix by 90 degrees', leetcodeNumber: 48, difficulty: 'Medium',
 companies: ['Google', 'Microsoft'], topic: 'Arrays', completed: false},
{id: '62', name: 'Two Sum', leetcodeNumber: 1, difficulty: 'Easy',
 companies: ['Google', 'Amazon', 'Facebook', 'Microsoft'], topic: 'Arrays', completed: false},
{id: '63', name: '3 Sum', leetcodeNumber: 15, difficulty: 'Medium', companies: ['Facebook', 'Amazon'], topic: 'Arrays',
 completed: false},
{id: '64', name: '4 Sum', leetcodeNumber: 18, difficulty: 'Medium', companies: ['Google', 'Microsoft'], topic: 'Arrays',
 completed: false},
{id: '65', name: 'Sort an array of 0\'s 1\'s and 2\'s', leetcodeNumber: 75, difficulty: 'Medium',
 companies: ['Amazon', 'Apple'], topic: 'Arrays', completed: false},
{id: '66', name: 'Kadane\'s Algorithm', leetcodeNumber: 53, difficulty: 'Easy',
 companies: ['Amazon', 'Microsoft', 'Google'], topic: 'Arrays', completed: false},
{id: '67', name: 'Next Permutation', leetcodeNumber: 31, difficulty: 'Medium', companies: ['Google', 'Facebook'],
 topic: 'Arrays', completed: false},
{id: '68', name: 'Majority Element-I', leetcodeNumber: 169, difficulty: 'Easy', companies: ['Microsoft', 'Amazon'],
 topic: 'Arrays', completed: false},
{id: '69', name: 'Majority Element-II', leetcodeNumber: 229, difficulty: 'Medium', companies: ['Google', 'Apple'],
 topic: 'Arrays', completed: false},
{id: '70', name: 'Find the repeating and missing number', leetcodeNumber: null, difficulty: 'Medium',
 companies: ['Facebook', 'Microsoft'], topic: 'Arrays', completed: false},
{id: '71', name: 'Count Inversions', leetcodeNumber: null, difficulty: 'Hard', companies: ['Amazon', 'Google'],
 topic: 'Arrays', completed: false},
{id: '72', name: 'Reverse Pairs', leetcodeNumber: 493, difficulty: 'Hard', companies: ['Apple', 'Facebook'],
 topic: 'Arrays', completed: false},
{id: '73', name: 'Maximum Product Subarray in an Array', leetcodeNumber: 152, difficulty: 'Medium',
 companies: ['Google', 'Microsoft'], topic: 'Arrays', completed: false},
{id: '74', name: 'Merge two sorted arrays without extra space', leetcodeNumber: 88, difficulty: 'Easy',
 companies: ['Amazon', 'Apple'], topic: 'Arrays', completed: false},

// Hashing
{id: '75', name: 'Longest Consecutive Sequence in an Array', leetcodeNumber: 128, difficulty: 'Medium',
 companies: ['Google', 'Facebook'], topic: 'Hashing', completed: false},
{id: '76', name: 'Longest subarray with sum K', leetcodeNumber: null, difficulty: 'Medium',
 companies: ['Microsoft', 'Amazon'], topic: 'Hashing', completed: false},
{id: '77', name: 'Count subarrays with given sum', leetcodeNumber: 560, difficulty: 'Medium',
 companies: ['Apple', 'Google'], topic: 'Hashing', completed: false},
{id: '78', name: 'Count subarrays with given xor K', leetcodeNumber: null, difficulty: 'Medium',
 companies: ['Facebook', 'Microsoft'], topic: 'Hashing', completed: false},

// Binary
Search
{id: '79', name: 'Search X in sorted array', leetcodeNumber: 704, difficulty: 'Easy', companies: ['Google', 'Amazon'],
 topic: 'Binary Search', completed: false},
{id: '80', name: 'Lower Bound', leetcodeNumber: null, difficulty: 'Easy', companies: ['Microsoft', 'Apple'],
 topic: 'Binary Search', completed: false},
{id: '81', name: 'Upper Bound', leetcodeNumber: null, difficulty: 'Easy', companies: ['Facebook', 'Google'],
 topic: 'Binary Search', completed: false},
{id: '82', name: 'Search insert position', leetcodeNumber: 35, difficulty: 'Easy', companies: ['Amazon', 'Microsoft'],
 topic: 'Binary Search', completed: false},
{id: '83', name: 'Floor and Ceil in Sorted Array', leetcodeNumber: null, difficulty: 'Easy',
 companies: ['Google', 'Apple'], topic: 'Binary Search', completed: false},
{id: '84', name: 'First and last occurrence', leetcodeNumber: 34, difficulty: 'Medium',
 companies: ['Facebook', 'Amazon'], topic: 'Binary Search', completed: false},
{id: '85', name: 'Search in rotated sorted array-I', leetcodeNumber: 33, difficulty: 'Medium',
 companies: ['Google', 'Microsoft'], topic: 'Binary Search', completed: false},
{id: '86', name: 'Search in rotated sorted array-II', leetcodeNumber: 81, difficulty: 'Medium',
 companies: ['Apple', 'Facebook'], topic: 'Binary Search', completed: false},
{id: '87', name: 'Find minimum in Rotated Sorted Array', leetcodeNumber: 153, difficulty: 'Medium',
 companies: ['Amazon', 'Google'], topic: 'Binary Search', completed: false},
{id: '88', name: 'Find out how many times the array is rotated', leetcodeNumber: null, difficulty: 'Medium',
 companies: ['Microsoft', 'Apple'], topic: 'Binary Search', completed: false},
{id: '89', name: 'Single element in sorted array', leetcodeNumber: 540, difficulty: 'Medium',
 companies: ['Facebook', 'Google'], topic: 'Binary Search', completed: false},
{id: '90', name: 'Find square root of a number', leetcodeNumber: 69, difficulty: 'Easy',
 companies: ['Amazon', 'Microsoft'], topic: 'Binary Search', completed: false},
{id: '91', name: 'Find Nth root of a number', leetcodeNumber: null, difficulty: 'Medium',
 companies: ['Google', 'Apple'], topic: 'Binary Search', completed: false},
{id: '92', name: 'Find the smallest divisor', leetcodeNumber: 1283, difficulty: 'Medium',
 companies: ['Facebook', 'Amazon'], topic: 'Binary Search', completed: false},
{id: '93', name: 'Koko eating bananas', leetcodeNumber: 875, difficulty: 'Medium', companies: ['Microsoft', 'Google'],
 topic: 'Binary Search', completed: false},
{id: '94', name: 'Minimum days to make M bouquets', leetcodeNumber: 1482, difficulty: 'Medium',
 companies: ['Apple', 'Facebook'], topic: 'Binary Search', completed: false},
{id: '95', name: 'Aggressive Cows', leetcodeNumber: null, difficulty: 'Hard', companies: ['Amazon', 'Google'],
 topic: 'Binary Search', completed: false},
{id: '96', name: 'Book Allocation Problem', leetcodeNumber: null, difficulty: 'Hard', companies: ['Microsoft', 'Apple'],
 topic: 'Binary Search', completed: false},
{id: '97', name: 'Find peak element', leetcodeNumber: 162, difficulty: 'Medium', companies: ['Facebook', 'Amazon'],
 topic: 'Binary Search', completed: false},
{id: '98', name: 'Median of 2 sorted arrays', leetcodeNumber: 4, difficulty: 'Hard', companies: ['Google', 'Microsoft'],
 topic: 'Binary Search', completed: false},
{id: '99', name: 'Minimize Max Distance to Gas Station', leetcodeNumber: 774, difficulty: 'Hard',
 companies: ['Apple', 'Facebook'], topic: 'Binary Search', completed: false},
{id: '100', name: 'Kth element of 2 sorted arrays', leetcodeNumber: null, difficulty: 'Hard',
 companies: ['Amazon', 'Google'], topic: 'Binary Search', completed: false},
{id: '101', name: 'Split array - largest sum', leetcodeNumber: 410, difficulty: 'Hard',
 companies: ['Microsoft', 'Apple'], topic: 'Binary Search', completed: false},
{id: '102', name: 'Find row with maximum 1\'s', leetcodeNumber: null, difficulty: 'Medium',
 companies: ['Facebook', 'Amazon'], topic: 'Binary Search', completed: false},
{id: '103', name: 'Search in a 2D matrix', leetcodeNumber: 74, difficulty: 'Medium', companies: ['Google', 'Microsoft'],
 topic: 'Binary Search', completed: false},
{id: '104', name: 'Search in 2D matrix - II', leetcodeNumber: 240, difficulty: 'Medium',
 companies: ['Apple', 'Facebook'], topic: 'Binary Search', completed: false},
{id: '105', name: 'Find Peak Element', leetcodeNumber: 162, difficulty: 'Medium', companies: ['Amazon', 'Google'],
 topic: 'Binary Search', completed: false},
{id: '106', name: 'Matrix Median', leetcodeNumber: null, difficulty: 'Hard', companies: ['Microsoft', 'Apple'],
 topic: 'Binary Search', completed: false},

// Recursion
{id: '107', name: 'Pow(x,n)', leetcodeNumber: 50, difficulty: 'Medium', companies: ['Facebook', 'Amazon'],
 topic: 'Recursion', completed: false},
{id: '108', name: 'Generate Parentheses', leetcodeNumber: 22, difficulty: 'Medium', companies: ['Google', 'Microsoft'],
 topic: 'Recursion', completed: false},
{id: '109', name: 'Power Set', leetcodeNumber: 78, difficulty: 'Medium', companies: ['Apple', 'Facebook'],
 topic: 'Recursion', completed: false},
{id: '110', name: 'Check if there exists a subsequence with sum K', leetcodeNumber: null, difficulty: 'Medium',
 companies: ['Amazon', 'Google'], topic: 'Recursion', completed: false},
{id: '111', name: 'Count all subsequences with sum K', leetcodeNumber: null, difficulty: 'Medium',
 companies: ['Microsoft', 'Apple'], topic: 'Recursion', completed: false},
{id: '112', name: 'Combination Sum', leetcodeNumber: 39, difficulty: 'Medium', companies: ['Facebook', 'Amazon'],
 topic: 'Recursion', completed: false},
{id: '113', name: 'Combination Sum II', leetcodeNumber: 40, difficulty: 'Medium', companies: ['Google', 'Microsoft'],
 topic: 'Recursion', completed: false},
{id: '114', name: 'Subsets I', leetcodeNumber: 78, difficulty: 'Medium', companies: ['Apple', 'Facebook'],
 topic: 'Recursion', completed: false},
{id: '115', name: 'Subsets II', leetcodeNumber: 90, difficulty: 'Medium', companies: ['Amazon', 'Google'],
 topic: 'Recursion', completed: false},
{id: '116', name: 'Combination Sum III', leetcodeNumber: 216, difficulty: 'Medium', companies: ['Microsoft', 'Apple'],
 topic: 'Recursion', completed: false},
{id: '117', name: 'Letter Combinations of a Phone Number', leetcodeNumber: 17, difficulty: 'Medium',
 companies: ['Facebook', 'Amazon'], topic: 'Recursion', completed: false},
{id: '118', name: 'Palindrome partitioning', leetcodeNumber: 131, difficulty: 'Medium',
 companies: ['Google', 'Microsoft'], topic: 'Recursion', completed: false},
{id: '119', name: 'Word Search', leetcodeNumber: 79, difficulty: 'Medium', companies: ['Apple', 'Facebook'],
 topic: 'Recursion', completed: false},
{id: '120', name: 'N Queen', leetcodeNumber: 51, difficulty: 'Hard', companies: ['Amazon', 'Google'],
 topic: 'Recursion', completed: false},
{id: '121', name: 'Rat in a Maze', leetcodeNumber: null, difficulty: 'Medium', companies: ['Microsoft', 'Apple'],
 topic: 'Recursion', completed: false},
{id: '122', name: 'M Coloring Problem', leetcodeNumber: null, difficulty: 'Medium', companies: ['Facebook', 'Amazon'],
 topic: 'Recursion', completed: false},
{id: '123', name: 'Sudoko Solver', leetcodeNumber: 37, difficulty: 'Hard', companies: ['Google', 'Microsoft'],
 topic: 'Recursion', completed: false},

// Linked
List
{id: '124', name: 'Traversal in Linked List', leetcodeNumber: null, difficulty: 'Easy',
 companies: ['Apple', 'Facebook'], topic: 'Linked List', completed: false},
{id: '125', name: 'Deletion of the head of LL', leetcodeNumber: null, difficulty: 'Easy',
 companies: ['Amazon', 'Google'], topic: 'Linked List', completed: false},
{id: '126', name: 'Deletion of the tail of LL', leetcodeNumber: null, difficulty: 'Easy',
 companies: ['Microsoft', 'Apple'], topic: 'Linked List', completed: false},
{id: '127', name: 'Deletion of the Kth element of LL', leetcodeNumber: null, difficulty: 'Easy',
 companies: ['Facebook', 'Amazon'], topic: 'Linked List', completed: false},
{id: '128', name: 'Delete the element with value X', leetcodeNumber: null, difficulty: 'Easy',
 companies: ['Google', 'Microsoft'], topic: 'Linked List', completed: false},
{id: '129', name: 'Insertion at the head of LL', leetcodeNumber: null, difficulty: 'Easy',
 companies: ['Apple', 'Facebook'], topic: 'Linked List', completed: false},
{id: '130', name: 'Insertion at the tail of LL', leetcodeNumber: null, difficulty: 'Easy',
 companies: ['Amazon', 'Google'], topic: 'Linked List', completed: false},
{id: '131', name: 'Insertion at the Kth position of LL', leetcodeNumber: null, difficulty: 'Easy',
 companies: ['Microsoft', 'Apple'], topic: 'Linked List', completed: false},
{id: '132', name: 'Insertion before the value X in LL', leetcodeNumber: null, difficulty: 'Easy',
 companies: ['Facebook', 'Amazon'], topic: 'Linked List', completed: false},
{id: '133', name: 'Introduction to Doubly LL', leetcodeNumber: null, difficulty: 'Easy',
 companies: ['Google', 'Microsoft'], topic: 'Linked List', completed: false},
{id: '134', name: 'Deletion in Doubly LL', leetcodeNumber: null, difficulty: 'Easy', companies: ['Apple', 'Facebook'],
 topic: 'Linked List', completed: false},
{id: '135', name: 'Insertion in DLL', leetcodeNumber: null, difficulty: 'Easy', companies: ['Amazon', 'Google'],
 topic: 'Linked List', completed: false},
{id: '136', name: 'Convert Array to DLL', leetcodeNumber: null, difficulty: 'Easy', companies: ['Microsoft', 'Apple'],
 topic: 'Linked List', completed: false},
{id: '137', name: 'Delete head of DLL', leetcodeNumber: null, difficulty: 'Easy', companies: ['Facebook', 'Amazon'],
 topic: 'Linked List', completed: false},
{id: '138', name: 'Delete Tail of DLL', leetcodeNumber: null, difficulty: 'Easy', companies: ['Google', 'Microsoft'],
 topic: 'Linked List', completed: false},
{id: '139', name: 'Delete Kth Element of DLL', leetcodeNumber: null, difficulty: 'Easy',
 companies: ['Apple', 'Facebook'], topic: 'Linked List', completed: false},
{id: '140', name: 'Removing given node in DLL', leetcodeNumber: null, difficulty: 'Easy',
 companies: ['Amazon', 'Google'], topic: 'Linked List', completed: false},
{id: '141', name: 'Insert node before head in DLL', leetcodeNumber: null, difficulty: 'Easy',
 companies: ['Microsoft', 'Apple'], topic: 'Linked List', completed: false},
{id: '142', name: 'Insert node before tail in DLL', leetcodeNumber: null, difficulty: 'Easy',
 companies: ['Facebook', 'Amazon'], topic: 'Linked List', completed: false},
{id: '143', name: 'Insert node before (kth node) in DLL', leetcodeNumber: null, difficulty: 'Easy',
 companies: ['Google', 'Microsoft'], topic: 'Linked List', completed: false},
{id: '144', name: 'Insert before given node in DLL', leetcodeNumber: null, difficulty: 'Easy',
 companies: ['Apple', 'Facebook'], topic: 'Linked List', completed: false},
{id: '145', name: 'Add two numbers in LL', leetcodeNumber: 2, difficulty: 'Medium', companies: ['Amazon', 'Google'],
 topic: 'Linked List', completed: false},
{id: '146', name: 'Segregate odd and even nodes in LL', leetcodeNumber: 328, difficulty: 'Medium',
 companies: ['Microsoft', 'Apple'], topic: 'Linked List', completed: false},
{id: '147', name: 'Sort a LL of 0\'s 1\'s and 2\'s', leetcodeNumber: null, difficulty: 'Medium',
 companies: ['Facebook', 'Amazon'], topic: 'Linked List', completed: false},
{id: '148', name: 'Remove Nth node from the back of the LL', leetcodeNumber: 19, difficulty: 'Medium',
 companies: ['Google', 'Microsoft'], topic: 'Linked List', completed: false},
{id: '149', name: 'Reverse a LL', leetcodeNumber: 206, difficulty: 'Easy', companies: ['Apple', 'Facebook'],
 topic: 'Linked List', completed: false},
{id: '150', name: 'Add one to a number represented by LL', leetcodeNumber: null, difficulty: 'Medium',
 companies: ['Amazon', 'Google'], topic: 'Linked List', completed: false},
{id: '151', name: 'Check if LL is palindrome or not', leetcodeNumber: 234, difficulty: 'Easy',
 companies: ['Microsoft', 'Apple'], topic: 'Linked List', completed: false},
{id: '152', name: 'Find the intersection point of Y LL', leetcodeNumber: 160, difficulty: 'Easy',
 companies: ['Facebook', 'Amazon'], topic: 'Linked List', completed: false},
{id: '153', name: 'Detect a loop in LL', leetcodeNumber: 141, difficulty: 'Easy', companies: ['Google', 'Microsoft'],
 topic: 'Linked List', completed: false},
{id: '154', name: 'Find the starting point in LL', leetcodeNumber: 142, difficulty: 'Medium',
 companies: ['Apple', 'Facebook'], topic: 'Linked List', completed: false},
{id: '155', name: 'Find Middle of Linked List', leetcodeNumber: 876, difficulty: 'Easy',
 companies: ['Amazon', 'Google'], topic: 'Linked List', completed: false},
{id: '156', name: 'Length of loop in LL', leetcodeNumber: null, difficulty: 'Medium', companies: ['Microsoft', 'Apple'],
 topic: 'Linked List', completed: false},
{id: '157', name: 'Delete the middle node in LL', leetcodeNumber: 2095, difficulty: 'Medium',
 companies: ['Facebook', 'Amazon'], topic: 'Linked List', completed: false},
{id: '158', name: 'Reverse LL in group of given size K', leetcodeNumber: 25, difficulty: 'Hard',
 companies: ['Google', 'Microsoft'], topic: 'Linked List', completed: false},
{id: '159', name: 'Rotate a LL', leetcodeNumber: 61, difficulty: 'Medium', companies: ['Apple', 'Facebook'],
 topic: 'Linked List', completed: false},
{id: '160', name: 'Merge two Sorted Lists', leetcodeNumber: 21, difficulty: 'Easy', companies: ['Amazon', 'Google'],
 topic: 'Linked List', completed: false},
{id: '161', name: 'Flattening of LL', leetcodeNumber: 430, difficulty: 'Medium', companies: ['Microsoft', 'Apple'],
 topic: 'Linked List', completed: false},
{id: '162', name: 'Sort LL', leetcodeNumber: 148, difficulty: 'Medium', companies: ['Facebook', 'Amazon'],
 topic: 'Linked List', completed: false},
{id: '163', name: 'Clone a LL with random and next pointer', leetcodeNumber: 138, difficulty: 'Medium',
 companies: ['Google', 'Microsoft'], topic: 'Linked List', completed: false},
{id: '164', name: 'Delete all occurrences of a key in DLL', leetcodeNumber: null, difficulty: 'Medium',
 companies: ['Apple', 'Facebook'], topic: 'Linked List', completed: false},
{id: '165', name: 'Remove duplicated from sorted DLL', leetcodeNumber: null, difficulty: 'Easy',
 companies: ['Amazon', 'Google'], topic: 'Linked List', completed: false},

// Bit
Manipulation
{id: '166', name: 'Minimum Bit Flips to Convert Number', leetcodeNumber: 2220, difficulty: 'Easy',
 companies: ['Microsoft', 'Apple'], topic: 'Bit Manipulation', completed: false},
{id: '167', name: 'Single Number - I', leetcodeNumber: 136, difficulty: 'Easy', companies: ['Facebook', 'Amazon'],
 topic: 'Bit Manipulation', completed: false},
{id: '168', name: 'Single Number - II', leetcodeNumber: 137, difficulty: 'Medium', companies: ['Google', 'Microsoft'],
 topic: 'Bit Manipulation', completed: false},
{id: '169', name: 'Single Number - III', leetcodeNumber: 260, difficulty: 'Medium', companies: ['Apple', 'Facebook'],
 topic: 'Bit Manipulation', completed: false},
{id: '170', name: 'Divide two numbers without multiplication and division', leetcodeNumber: 29, difficulty: 'Medium',
 companies: ['Amazon', 'Google'], topic: 'Bit Manipulation', completed: false},
{id: '171', name: 'Power Set Bit Manipulation', leetcodeNumber: 78, difficulty: 'Medium',
 companies: ['Microsoft', 'Apple'], topic: 'Bit Manipulation', completed: false},
{id: '172', name: 'XOR of numbers in a given range', leetcodeNumber: null, difficulty: 'Medium',
 companies: ['Facebook', 'Amazon'], topic: 'Bit Manipulation', completed: false},

// Greedy
Algorithm
{id: '173', name: 'Assign Cookies', leetcodeNumber: 455, difficulty: 'Easy', companies: ['Google', 'Microsoft'],
 topic: 'Greedy Algorithm', completed: false},
{id: '174', name: 'Lemonade Change', leetcodeNumber: 860, difficulty: 'Easy', companies: ['Apple', 'Facebook'],
 topic: 'Greedy Algorithm', completed: false},
{id: '175', name: 'Jump Game - I', leetcodeNumber: 55, difficulty: 'Medium', companies: ['Amazon', 'Google'],
 topic: 'Greedy Algorithm', completed: false},
{id: '176', name: 'Shortest Job First', leetcodeNumber: null, difficulty: 'Medium', companies: ['Microsoft', 'Apple'],
 topic: 'Greedy Algorithm', completed: false},
{id: '177', name: 'Job sequencing Problem', leetcodeNumber: null, difficulty: 'Medium',
 companies: ['Facebook', 'Amazon'], topic: 'Greedy Algorithm', completed: false},
{id: '178', name: 'N meetings in one room', leetcodeNumber: null, difficulty: 'Medium',
 companies: ['Google', 'Microsoft'], topic: 'Greedy Algorithm', completed: false},
{id: '179', name: 'Non-overlapping Intervals', leetcodeNumber: 435, difficulty: 'Medium',
 companies: ['Apple', 'Facebook'], topic: 'Greedy Algorithm', completed: false},
{id: '180', name: 'Insert Interval', leetcodeNumber: 57, difficulty: 'Medium', companies: ['Amazon', 'Google'],
 topic: 'Greedy Algorithm', completed: false},
{id: '181', name: 'Minimum number of platforms required for a railway', leetcodeNumber: null, difficulty: 'Medium',
 companies: ['Microsoft', 'Apple'], topic: 'Greedy Algorithm', completed: false},
{id: '182', name: 'Valid Paranthesis Checker', leetcodeNumber: 20, difficulty: 'Easy',
 companies: ['Facebook', 'Amazon'], topic: 'Greedy Algorithm', completed: false},
{id: '183', name: 'Candy', leetcodeNumber: 135, difficulty: 'Hard', companies: ['Google', 'Microsoft'],
 topic: 'Greedy Algorithm', completed: false},

// Sliding
Window
{id: '184', name: 'Maximum Points You Can Obtain from Cards', leetcodeNumber: 1423, difficulty: 'Medium',
 companies: ['Apple', 'Facebook'], topic: 'Sliding Window', completed: false},
{id: '185', name: 'Longest Substring Without Repeating Characters', leetcodeNumber: 3, difficulty: 'Medium',
 companies: ['Amazon', 'Google'], topic: 'Sliding Window', completed: false},
{id: '186', name: 'Max Consecutive Ones III', leetcodeNumber: 1004, difficulty: 'Medium',
 companies: ['Microsoft', 'Apple'], topic: 'Sliding Window', completed: false},
{id: '187', name: 'Fruit Into Baskets', leetcodeNumber: 904, difficulty: 'Medium', companies: ['Facebook', 'Amazon'],
 topic: 'Sliding Window', completed: false},
{id: '188', name: 'Longest Substring With At Most K Distinct Characters', leetcodeNumber: 340, difficulty: 'Medium',
 companies: ['Google', 'Microsoft'], topic: 'Sliding Window', completed: false},
{id: '189', name: 'Longest Repeating Character Replacement', leetcodeNumber: 424, difficulty: 'Medium',
 companies: ['Apple', 'Facebook'], topic: 'Sliding Window', completed: false},
{id: '190', name: 'Minimum Window Substring', leetcodeNumber: 76, difficulty: 'Hard', companies: ['Amazon', 'Google'],
 topic: 'Sliding Window', completed: false},
{id: '191', name: 'Number of Substrings Containing All Three Characters', leetcodeNumber: 1358, difficulty: 'Medium',
 companies: ['Microsoft', 'Apple'], topic: 'Sliding Window', completed: false},
{id: '192', name: 'Binary Subarrays With Sum', leetcodeNumber: 930, difficulty: 'Medium',
 companies: ['Facebook', 'Amazon'], topic: 'Sliding Window', completed: false},
{id: '193', name: 'Count number of Nice subarrays', leetcodeNumber: 1248, difficulty: 'Medium',
 companies: ['Google', 'Microsoft'], topic: 'Sliding Window', completed: false},

// Stack / Queues
{id: '194', name: 'Implement Stack using Arrays', leetcodeNumber: null, difficulty: 'Easy',
 companies: ['Apple', 'Facebook'], topic: 'Stack / Queues', completed: false},
{id: '195', name: 'Implement Queue using Arrays', leetcodeNumber: null, difficulty: 'Easy',
 companies: ['Amazon', 'Google'], topic: 'Stack / Queues', completed: false},
{id: '196', name: 'Implement Stack using Queue', leetcodeNumber: 225, difficulty: 'Easy',
 companies: ['Microsoft', 'Apple'], topic: 'Stack / Queues', completed: false},
{id: '197', name: 'Implement Queue using Stack', leetcodeNumber: 232, difficulty: 'Easy',
 companies: ['Facebook', 'Amazon'], topic: 'Stack / Queues', completed: false},
{id: '198', name: 'Implement stack using LinkedList', leetcodeNumber: null, difficulty: 'Easy',
 companies: ['Google', 'Microsoft'], topic: 'Stack / Queues', completed: false},
{id: '199', name: 'Implement queue using LinkedList', leetcodeNumber: null, difficulty: 'Easy',
 companies: ['Apple', 'Facebook'], topic: 'Stack / Queues', completed: false},
{id: '200', name: 'Balanced Paranthesis', leetcodeNumber: 20, difficulty: 'Easy', companies: ['Amazon', 'Google'],
 topic: 'Stack / Queues', completed: false},
{id: '201', name: 'Next Greater Element', leetcodeNumber: 496, difficulty: 'Easy', companies: ['Microsoft', 'Apple'],
 topic: 'Stack / Queues', completed: false},
{id: '202', name: 'Next Greater Element - 2', leetcodeNumber: 503, difficulty: 'Medium',
 companies: ['Facebook', 'Amazon'], topic: 'Stack / Queues', completed: false},
{id: '203', name: 'Asteroid Collision', leetcodeNumber: 735, difficulty: 'Medium', companies: ['Google', 'Microsoft'],
 topic: 'Stack / Queues', completed: false},
{id: '204', name: 'Sum of Subarray Minimums', leetcodeNumber: 907, difficulty: 'Medium',
 companies: ['Apple', 'Facebook'], topic: 'Stack / Queues', completed: false},
{id: '205', name: 'Sum of Subarray Ranges', leetcodeNumber: 2104, difficulty: 'Medium', companies: ['Amazon', 'Google'],
 topic: 'Stack / Queues', completed: false},
{id: '206', name: 'Remove K Digits', leetcodeNumber: 402, difficulty: 'Medium', companies: ['Microsoft', 'Apple'],
 topic: 'Stack / Queues', completed: false},
{id: '207', name: 'Implement Min Stack', leetcodeNumber: 155, difficulty: 'Easy', companies: ['Facebook', 'Amazon'],
 topic: 'Stack / Queues', completed: false},
{id: '208', name: 'Sliding Window Maximum', leetcodeNumber: 239, difficulty: 'Hard', companies: ['Google', 'Microsoft'],
 topic: 'Stack / Queues', completed: false},
{id: '209', name: 'Trapping Rainwater', leetcodeNumber: 42, difficulty: 'Hard', companies: ['Apple', 'Facebook'],
 topic: 'Stack / Queues', completed: false},
{id: '210', name: 'Largest rectangle in a histogram', leetcodeNumber: 84, difficulty: 'Hard',
 companies: ['Amazon', 'Google'], topic: 'Stack / Queues', completed: false},
{id: '211', name: 'Maximum Rectangles', leetcodeNumber: 85, difficulty: 'Hard', companies: ['Microsoft', 'Apple'],
 topic: 'Stack / Queues', completed: false},
{id: '212', name: 'Stock span problem', leetcodeNumber: 901, difficulty: 'Medium', companies: ['Facebook', 'Amazon'],
 topic: 'Stack / Queues', completed: false},
{id: '213', name: 'Celebrity Problem', leetcodeNumber: 277, difficulty: 'Medium', companies: ['Google', 'Microsoft'],
 topic: 'Stack / Queues', completed: false},
{id: '214', name: 'LRU Cache', leetcodeNumber: 146, difficulty: 'Medium', companies: ['Apple', 'Facebook'],
 topic: 'Stack / Queues', completed: false},
{id: '215', name: 'LFU Cache', leetcodeNumber: 460, difficulty: 'Hard', companies: ['Amazon', 'Google'],
 topic: 'Stack / Queues', completed: false},

// Binary
Tree
{id: '216', name: 'Inorder Traversal', leetcodeNumber: 94, difficulty: 'Easy', companies: ['Microsoft', 'Apple'],
 topic: 'Binary Tree', completed: false},
{id: '217', name: 'Preorder Traversal', leetcodeNumber: 144, difficulty: 'Easy', companies: ['Facebook', 'Amazon'],
 topic: 'Binary Tree', completed: false},
{id: '218', name: 'Postorder Traversal', leetcodeNumber: 145, difficulty: 'Easy', companies: ['Google', 'Microsoft'],
 topic: 'Binary Tree', completed: false},
{id: '219', name: 'Level Order Traversal', leetcodeNumber: 102, difficulty: 'Medium', companies: ['Apple', 'Facebook'],
 topic: 'Binary Tree', completed: false},
{id: '220', name: 'Pre, Post, Inorder in one traversal', leetcodeNumber: null, difficulty: 'Medium',
 companies: ['Amazon', 'Google'], topic: 'Binary Tree', completed: false},
{id: '221', name: 'Maximum Depth in BT', leetcodeNumber: 104, difficulty: 'Easy', companies: ['Microsoft', 'Apple'],
 topic: 'Binary Tree', completed: false},
{id: '222', name: 'Check if two trees are identical or not', leetcodeNumber: 100, difficulty: 'Easy',
 companies: ['Facebook', 'Amazon'], topic: 'Binary Tree', completed: false},
{id: '223', name: 'Check for balanced binary tree', leetcodeNumber: 110, difficulty: 'Easy',
 companies: ['Google', 'Microsoft'], topic: 'Binary Tree', completed: false},
{id: '224', name: 'Diameter of Binary Tree', leetcodeNumber: 543, difficulty: 'Easy', companies: ['Apple', 'Facebook'],
 topic: 'Binary Tree', completed: false},
{id: '225', name: 'Maximum path sum', leetcodeNumber: 124, difficulty: 'Hard', companies: ['Amazon', 'Google'],
 topic: 'Binary Tree', completed: false},
{id: '226', name: 'Check for symmetrical BTs', leetcodeNumber: 101, difficulty: 'Easy',
 companies: ['Microsoft', 'Apple'], topic: 'Binary Tree', completed: false},
{id: '227', name: 'Zig Zag or Spiral Traversal', leetcodeNumber: 103, difficulty: 'Medium',
 companies: ['Facebook', 'Amazon'], topic: 'Binary Tree', completed: false},
{id: '228', name: 'Boundary Traversal', leetcodeNumber: null, difficulty: 'Medium', companies: ['Google', 'Microsoft'],
 topic: 'Binary Tree', completed: false},
{id: '229', name: 'Vertical Order Traversal', leetcodeNumber: 987, difficulty: 'Hard', companies: ['Apple', 'Facebook'],
 topic: 'Binary Tree', completed: false},
{id: '230', name: 'Top View of BT', leetcodeNumber: null, difficulty: 'Medium', companies: ['Amazon', 'Google'],
 topic: 'Binary Tree', completed: false},
{id: '231', name: 'Bottom view of BT', leetcodeNumber: null, difficulty: 'Medium', companies: ['Microsoft', 'Apple'],
 topic: 'Binary Tree', completed: false},
{id: '232', name: 'Right/Left View of BT', leetcodeNumber: 199, difficulty: 'Medium', companies: ['Facebook', 'Amazon'],
 topic: 'Binary Tree', completed: false},
{id: '233', name: 'Print root to node path in BT', leetcodeNumber: null, difficulty: 'Medium',
 companies: ['Google', 'Microsoft'], topic: 'Binary Tree', completed: false},
{id: '234', name: 'LCA in BT', leetcodeNumber: 236, difficulty: 'Medium', companies: ['Apple', 'Facebook'],
 topic: 'Binary Tree', completed: false},
{id: '235', name: 'Maximum Width of BT', leetcodeNumber: 662, difficulty: 'Medium', companies: ['Amazon', 'Google'],
 topic: 'Binary Tree', completed: false},
{id: '236', name: 'Print all nodes at a distance of K in BT', leetcodeNumber: 863, difficulty: 'Medium',
 companies: ['Microsoft', 'Apple'], topic: 'Binary Tree', completed: false},
{id: '237', name: 'Minimum time taken to burn the BT from a given Node', leetcodeNumber: null, difficulty: 'Hard',
 companies: ['Facebook', 'Amazon'], topic: 'Binary Tree', completed: false},
{id: '238', name: 'Count total nodes in a complete BT', leetcodeNumber: 222, difficulty: 'Medium',
 companies: ['Google', 'Microsoft'], topic: 'Binary Tree', completed: false},
{id: '239', name: 'Requirements needed to construct a unique BT', leetcodeNumber: null, difficulty: 'Medium',
 companies: ['Apple', 'Facebook'], topic: 'Binary Tree', completed: false},
{id: '240', name: 'Construct a BT from Preorder and Inorder', leetcodeNumber: 105, difficulty: 'Medium',
 companies: ['Amazon', 'Google'], topic: 'Binary Tree', completed: false},
{id: '241', name: 'Construct a BT from Postorder and Inorder', leetcodeNumber: 106, difficulty: 'Medium',
 companies: ['Microsoft', 'Apple'], topic: 'Binary Tree', completed: false},
{id: '242', name: 'Serialize and De-serialize BT', leetcodeNumber: 297, difficulty: 'Hard',
 companies: ['Facebook', 'Amazon'], topic: 'Binary Tree', completed: false},
{id: '243', name: 'Morris Inorder Traversal', leetcodeNumber: null, difficulty: 'Hard',
 companies: ['Google', 'Microsoft'], topic: 'Binary Tree', completed: false},
{id: '244', name: 'Morris Preorder Traversal', leetcodeNumber: null, difficulty: 'Hard',
 companies: ['Apple', 'Facebook'], topic: 'Binary Tree', completed: false},

// Binary
Search
Tree
{id: '245', name: 'Search in BST', leetcodeNumber: 700, difficulty: 'Easy', companies: ['Amazon', 'Google'],
 topic: 'Binary Search Tree', completed: false},
{id: '246', name: 'Floor and Ceil in a BST', leetcodeNumber: null, difficulty: 'Medium',
 companies: ['Microsoft', 'Apple'], topic: 'Binary Search Tree', completed: false},
{id: '247', name: 'Insert a given node in BST', leetcodeNumber: 701, difficulty: 'Medium',
 companies: ['Facebook', 'Amazon'], topic: 'Binary Search Tree', completed: false},
{id: '248', name: 'Delete a node in BST', leetcodeNumber: 450, difficulty: 'Medium', companies: ['Google', 'Microsoft'],
 topic: 'Binary Search Tree', completed: false},
{id: '249', name: 'Kth Smallest and Largest element in BST', leetcodeNumber: 230, difficulty: 'Medium',
 companies: ['Apple', 'Facebook'], topic: 'Binary Search Tree', completed: false},
{id: '250', name: 'Check if a tree is a BST or not', leetcodeNumber: 98, difficulty: 'Medium',
 companies: ['Amazon', 'Google'], topic: 'Binary Search Tree', completed: false},
{id: '251', name: 'LCA in BST', leetcodeNumber: 235, difficulty: 'Easy', companies: ['Microsoft', 'Apple'],
 topic: 'Binary Search Tree', completed: false},
{id: '252', name: 'Construct a BST from a preorder traversal', leetcodeNumber: 1008, difficulty: 'Medium',
 companies: ['Facebook', 'Amazon'], topic: 'Binary Search Tree', completed: false},
{id: '253', name: 'Inorder successor and predecessor in BST', leetcodeNumber: 285, difficulty: 'Medium',
 companies: ['Google', 'Microsoft'], topic: 'Binary Search Tree', completed: false},
{id: '254', name: 'BST iterator', leetcodeNumber: 173, difficulty: 'Medium', companies: ['Apple', 'Facebook'],
 topic: 'Binary Search Tree', completed: false},
{id: '255', name: 'Two sum in BST', leetcodeNumber: 653, difficulty: 'Easy', companies: ['Amazon', 'Google'],
 topic: 'Binary Search Tree', completed: false},
{id: '256', name: 'Correct BST with two nodes swapped', leetcodeNumber: 99, difficulty: 'Medium',
 companies: ['Microsoft', 'Apple'], topic: 'Binary Search Tree', completed: false},
{id: '257', name: 'Largest BST in Binary Tree', leetcodeNumber: null, difficulty: 'Hard',
 companies: ['Facebook', 'Amazon'], topic: 'Binary Search Tree', completed: false},

// Heaps
{id: '258', name: 'Heapify Algorithm', leetcodeNumber: null, difficulty: 'Medium', companies: ['Google', 'Microsoft'],
 topic: 'Heaps', completed: false},
{id: '259', name: 'Build heap from a given Array', leetcodeNumber: null, difficulty: 'Medium',
 companies: ['Apple', 'Facebook'], topic: 'Heaps', completed: false},
{id: '260', name: 'Implement Min Heap', leetcodeNumber: null, difficulty: 'Medium', companies: ['Amazon', 'Google'],
 topic: 'Heaps', completed: false},
{id: '261', name: 'Implement Max Heap', leetcodeNumber: null, difficulty: 'Medium', companies: ['Microsoft', 'Apple'],
 topic: 'Heaps', completed: false},
{id: '262', name: 'Check if an array represents a min heap', leetcodeNumber: null, difficulty: 'Easy',
 companies: ['Facebook', 'Amazon'], topic: 'Heaps', completed: false},
{id: '263', name: 'Convert Min Heap to Max Heap', leetcodeNumber: null, difficulty: 'Medium',
 companies: ['Google', 'Microsoft'], topic: 'Heaps', completed: false},
{id: '264', name: 'Heap Sort', leetcodeNumber: null, difficulty: 'Medium', companies: ['Apple', 'Facebook'],
 topic: 'Heaps', completed: false},
{id: '265', name: 'K-th Largest element in an array', leetcodeNumber: 215, difficulty: 'Medium',
 companies: ['Amazon', 'Google'], topic: 'Heaps', completed: false},
{id: '266', name: 'Kth largest element in a stream of running integers', leetcodeNumber: 703, difficulty: 'Easy',
 companies: ['Microsoft', 'Apple'], topic: 'Heaps', completed: false},

// Graphs
{id: '267', name: 'Connected Components', leetcodeNumber: 323, difficulty: 'Medium', companies: ['Facebook', 'Amazon'],
 topic: 'Graphs', completed: false},
{id: '268', name: 'Traversal Techniques', leetcodeNumber: null, difficulty: 'Medium',
 companies: ['Google', 'Microsoft'], topic: 'Graphs', completed: false},
{id: '269', name: 'Number of provinces', leetcodeNumber: 547, difficulty: 'Medium', companies: ['Apple', 'Facebook'],
 topic: 'Graphs', completed: false},
{id: '270', name: 'Number of islands', leetcodeNumber: 200, difficulty: 'Medium', companies: ['Amazon', 'Google'],
 topic: 'Graphs', completed: false},
{id: '271', name: 'Flood fill algorithm', leetcodeNumber: 733, difficulty: 'Easy', companies: ['Microsoft', 'Apple'],
 topic: 'Graphs', completed: false},
{id: '272', name: 'Number of enclaves', leetcodeNumber: 1020, difficulty: 'Medium', companies: ['Facebook', 'Amazon'],
 topic: 'Graphs', completed: false},
{id: '273', name: 'Rotten Oranges', leetcodeNumber: 994, difficulty: 'Medium', companies: ['Google', 'Microsoft'],
 topic: 'Graphs', completed: false},
{id: '274', name: 'Distance of nearest cell having one', leetcodeNumber: 542, difficulty: 'Medium',
 companies: ['Apple', 'Facebook'], topic: 'Graphs', completed: false},
{id: '275', name: 'Surrounded Regions', leetcodeNumber: 130, difficulty: 'Medium', companies: ['Amazon', 'Google'],
 topic: 'Graphs', completed: false},
{id: '276', name: 'Number of distinct islands', leetcodeNumber: 694, difficulty: 'Medium',
 companies: ['Microsoft', 'Apple'], topic: 'Graphs', completed: false},
{id: '277', name: 'Detect a cycle in an undirected graph', leetcodeNumber: null, difficulty: 'Medium',
 companies: ['Facebook', 'Amazon'], topic: 'Graphs', completed: false},
{id: '278', name: 'Bipartite graph', leetcodeNumber: 785, difficulty: 'Medium', companies: ['Google', 'Microsoft'],
 topic: 'Graphs', completed: false},
{id: '279', name: 'Topological sort or Kahn\'s algorithm', leetcodeNumber: null, difficulty: 'Medium',
 companies: ['Apple', 'Facebook'], topic: 'Graphs', completed: false},
{id: '280', name: 'Detect a cycle in a directed graph', leetcodeNumber: null, difficulty: 'Medium',
 companies: ['Amazon', 'Google'], topic: 'Graphs', completed: false},
{id: '281', name: 'Find eventual safe states', leetcodeNumber: 802, difficulty: 'Medium',
 companies: ['Microsoft', 'Apple'], topic: 'Graphs', completed: false},
{id: '282', name: 'Course Schedule I', leetcodeNumber: 207, difficulty: 'Medium', companies: ['Facebook', 'Amazon'],
 topic: 'Graphs', completed: false},
{id: '283', name: 'Course Schedule II', leetcodeNumber: 210, difficulty: 'Medium', companies: ['Google', 'Microsoft'],
 topic: 'Graphs', completed: false},
{id: '284', name: 'Alien Dictionary', leetcodeNumber: 269, difficulty: 'Hard', companies: ['Apple', 'Facebook'],
 topic: 'Graphs', completed: false},
{id: '285', name: 'Shortest path in DAG', leetcodeNumber: null, difficulty: 'Medium', companies: ['Amazon', 'Google'],
 topic: 'Graphs', completed: false},
{id: '286', name: 'Shortest path in undirected graph with unit weights', leetcodeNumber: null, difficulty: 'Medium',
 companies: ['Microsoft', 'Apple'], topic: 'Graphs', completed: false},
{id: '287', name: 'Word ladder I', leetcodeNumber: 127, difficulty: 'Hard', companies: ['Facebook', 'Amazon'],
 topic: 'Graphs', completed: false},
{id: '288', name: 'Word ladder II', leetcodeNumber: 126, difficulty: 'Hard', companies: ['Google', 'Microsoft'],
 topic: 'Graphs', completed: false},
{id: '289', name: 'Dijkstra\'s algorithm', leetcodeNumber: null, difficulty: 'Medium', companies: ['Apple', 'Facebook'],
 topic: 'Graphs', completed: false},
{id: '290', name: 'Print Shortest Path', leetcodeNumber: null, difficulty: 'Medium', companies: ['Amazon', 'Google'],
 topic: 'Graphs', completed: false},
{id: '291', name: 'Shortest Distance in a Binary Maze', leetcodeNumber: null, difficulty: 'Medium',
 companies: ['Microsoft', 'Apple'], topic: 'Graphs', completed: false},
{id: '292', name: 'Path with minimum effort', leetcodeNumber: 1631, difficulty: 'Medium',
 companies: ['Facebook', 'Amazon'], topic: 'Graphs', completed: false},
{id: '293', name: 'Cheapest flight within K stops', leetcodeNumber: 787, difficulty: 'Medium',
 companies: ['Google', 'Microsoft'], topic: 'Graphs', completed: false},
{id: '294', name: 'Minimum multiplications to reach end', leetcodeNumber: null, difficulty: 'Medium',
 companies: ['Apple', 'Facebook'], topic: 'Graphs', completed: false},
{id: '295', name: 'Number of ways to arrive at destination', leetcodeNumber: 1976, difficulty: 'Medium',
 companies: ['Amazon', 'Google'], topic: 'Graphs', completed: false},
{id: '296', name: 'Bellman ford algorithm', leetcodeNumber: null, difficulty: 'Medium',
 companies: ['Microsoft', 'Apple'], topic: 'Graphs', completed: false},
{id: '297', name: 'Floyd warshall algorithm', leetcodeNumber: null, difficulty: 'Medium',
 companies: ['Facebook', 'Amazon'], topic: 'Graphs', completed: false},
{id: '298', name: 'Find the city with the smallest number of neighbors', leetcodeNumber: 1334, difficulty: 'Medium',
 companies: ['Google', 'Microsoft'], topic: 'Graphs', completed: false},
{id: '299', name: 'Disjoint Set', leetcodeNumber: null, difficulty: 'Medium', companies: ['Apple', 'Facebook'],
 topic: 'Graphs', completed: false},
{id: '300', name: 'Find the MST weight', leetcodeNumber: null, difficulty: 'Medium', companies: ['Amazon', 'Google'],
 topic: 'Graphs', completed: false},
{id: '301', name: 'Number of operations to make network connected', leetcodeNumber: 1319, difficulty: 'Medium',
 companies: ['Microsoft', 'Apple'], topic: 'Graphs', completed: false},
{id: '302', name: 'Accounts merge', leetcodeNumber: 721, difficulty: 'Medium', companies: ['Facebook', 'Amazon'],
 topic: 'Graphs', completed: false},
{id: '303', name: 'Number of islands II', leetcodeNumber: 305, difficulty: 'Hard', companies: ['Google', 'Microsoft'],
 topic: 'Graphs', completed: false},
{id: '304', name: 'Making a large island', leetcodeNumber: 827, difficulty: 'Hard', companies: ['Apple', 'Facebook'],
 topic: 'Graphs', completed: false},
{id: '305', name: 'Most stones removed with same row or column', leetcodeNumber: 947, difficulty: 'Medium',
 companies: ['Amazon', 'Google'], topic: 'Graphs', completed: false},
{id: '306', name: 'Kosaraju\'s algorithm', leetcodeNumber: null, difficulty: 'Hard', companies: ['Microsoft', 'Apple'],
 topic: 'Graphs', completed: false},
{id: '307', name: 'Bridges in graph', leetcodeNumber: 1192, difficulty: 'Hard', companies: ['Facebook', 'Amazon'],
 topic: 'Graphs', completed: false},
{id: '308', name: 'Articulation point in graph', leetcodeNumber: null, difficulty: 'Hard',
 companies: ['Google', 'Microsoft'], topic: 'Graphs', completed: false},

// Dynamic
Programming
{id: '309', name: 'Climbing stairs', leetcodeNumber: 70, difficulty: 'Easy', companies: ['Apple', 'Facebook'],
 topic: 'Dynamic Programming', completed: false},
{id: '310', name: 'Frog Jump', leetcodeNumber: 403, difficulty: 'Hard', companies: ['Amazon', 'Google'],
 topic: 'Dynamic Programming', completed: false},
{id: '311', name: 'Frog jump with K distances', leetcodeNumber: null, difficulty: 'Medium',
 companies: ['Microsoft', 'Apple'], topic: 'Dynamic Programming', completed: false},
{id: '312', name: 'Maximum sum of non adjacent elements', leetcodeNumber: 198, difficulty: 'Medium',
 companies: ['Facebook', 'Amazon'], topic: 'Dynamic Programming', completed: false},
{id: '313', name: 'House robber', leetcodeNumber: 198, difficulty: 'Medium', companies: ['Google', 'Microsoft'],
 topic: 'Dynamic Programming', completed: false},
{id: '314', name: 'Ninja\'s training', leetcodeNumber: null, difficulty: 'Medium', companies: ['Apple', 'Facebook'],
 topic: 'Dynamic Programming', completed: false},
{id: '315', name: 'Grid unique paths', leetcodeNumber: 62, difficulty: 'Medium', companies: ['Amazon', 'Google'],
 topic: 'Dynamic Programming', completed: false},
{id: '316', name: 'Unique paths II', leetcodeNumber: 63, difficulty: 'Medium', companies: ['Microsoft', 'Apple'],
 topic: 'Dynamic Programming', completed: false},
{id: '317', name: 'Minimum Falling Path Sum', leetcodeNumber: 931, difficulty: 'Medium',
 companies: ['Facebook', 'Amazon'], topic: 'Dynamic Programming', completed: false},
{id: '318', name: 'Triangle', leetcodeNumber: 120, difficulty: 'Medium', companies: ['Google', 'Microsoft'],
 topic: 'Dynamic Programming', completed: false},
{id: '319', name: 'Cherry pickup II', leetcodeNumber: 1463, difficulty: 'Hard', companies: ['Apple', 'Facebook'],
 topic: 'Dynamic Programming', completed: false},
{id: '320', name: 'Best time to buy and sell stock', leetcodeNumber: 121, difficulty: 'Easy',
 companies: ['Amazon', 'Google'], topic: 'Dynamic Programming', completed: false},
{id: '321', name: 'Best time to buy and sell stock II', leetcodeNumber: 122, difficulty: 'Medium',
 companies: ['Microsoft', 'Apple'], topic: 'Dynamic Programming', completed: false},
{id: '322', name: 'Best time to buy and sell stock III', leetcodeNumber: 123, difficulty: 'Hard',
 companies: ['Facebook', 'Amazon'], topic: 'Dynamic Programming', completed: false},
{id: '323', name: 'Best time to buy and sell stock IV', leetcodeNumber: 188, difficulty: 'Hard',
 companies: ['Google', 'Microsoft'], topic: 'Dynamic Programming', completed: false},
{id: '324', name: 'Best time to buy and sell stock with transaction fees', leetcodeNumber: 714, difficulty: 'Medium',
 companies: ['Apple', 'Facebook'], topic: 'Dynamic Programming', completed: false},
{id: '325', name: 'Subset sum equals to target', leetcodeNumber: null, difficulty: 'Medium',
 companies: ['Amazon', 'Google'], topic: 'Dynamic Programming', completed: false},
{id: '326', name: 'Partition equal subset sum', leetcodeNumber: 416, difficulty: 'Medium',
 companies: ['Microsoft', 'Apple'], topic: 'Dynamic Programming', completed: false},
{id: '327', name: 'Partition a set into two subsets with minimum absolute sum difference', leetcodeNumber: null,
 difficulty: 'Medium', companies: ['Facebook', 'Amazon'], topic: 'Dynamic Programming', completed: false},
{id: '328', name: 'Count subsets with sum K', leetcodeNumber: null, difficulty: 'Medium',
 companies: ['Google', 'Microsoft'], topic: 'Dynamic Programming', completed: false},
{id: '329', name: 'Count partitions with given difference', leetcodeNumber: null, difficulty: 'Medium',
 companies: ['Apple', 'Facebook'], topic: 'Dynamic Programming', completed: false},
{id: '330', name: '0 and 1 Knapsack', leetcodeNumber: null, difficulty: 'Medium', companies: ['Amazon', 'Google'],
 topic: 'Dynamic Programming', completed: false},
{id: '331', name: 'Minimum coins', leetcodeNumber: 322, difficulty: 'Medium', companies: ['Microsoft', 'Apple'],
 topic: 'Dynamic Programming', completed: false},
{id: '332', name: 'Target sum', leetcodeNumber: 494, difficulty: 'Medium', companies: ['Facebook', 'Amazon'],
 topic: 'Dynamic Programming', completed: false},
{id: '333', name: 'Coin change II', leetcodeNumber: 518, difficulty: 'Medium', companies: ['Google', 'Microsoft'],
 topic: 'Dynamic Programming', completed: false},
{id: '334', name: 'Unbounded knapsack', leetcodeNumber: null, difficulty: 'Medium', companies: ['Apple', 'Facebook'],
 topic: 'Dynamic Programming', completed: false},
{id: '335', name: 'Rod cutting problem', leetcodeNumber: null, difficulty: 'Medium', companies: ['Amazon', 'Google'],
 topic: 'Dynamic Programming', completed: false},
{id: '336', name: 'Longest Increasing Subsequence', leetcodeNumber: 300, difficulty: 'Medium',
 companies: ['Microsoft', 'Apple'], topic: 'Dynamic Programming', completed: false},
{id: '337', name: 'Print Longest Increasing Subsequence', leetcodeNumber: null, difficulty: 'Medium',
 companies: ['Facebook', 'Amazon'], topic: 'Dynamic Programming', completed: false},
{id: '338', name: 'Largest Divisible Subset', leetcodeNumber: 368, difficulty: 'Medium',
 companies: ['Google', 'Microsoft'], topic: 'Dynamic Programming', completed: false},
{id: '339', name: 'Longest String Chain', leetcodeNumber: 1048, difficulty: 'Medium', companies: ['Apple', 'Facebook'],
 topic: 'Dynamic Programming', completed: false},
{id: '340', name: 'Longest Bitonic Subsequence', leetcodeNumber: null, difficulty: 'Medium',
 companies: ['Amazon', 'Google'], topic: 'Dynamic Programming', completed: false},
{id: '341', name: 'Number of Longest Increasing Subsequences', leetcodeNumber: 673, difficulty: 'Medium',
 companies: ['Microsoft', 'Apple'], topic: 'Dynamic Programming', completed: false},
{id: '342', name: 'Longest common subsequence', leetcodeNumber: 1143, difficulty: 'Medium',
 companies: ['Facebook', 'Amazon'], topic: 'Dynamic Programming', completed: false},
{id: '343', name: 'Longest common substring', leetcodeNumber: null, difficulty: 'Medium',
 companies: ['Google', 'Microsoft'], topic: 'Dynamic Programming', completed: false},
{id: '344', name: 'Longest palindromic subsequence', leetcodeNumber: 516, difficulty: 'Medium',
 companies: ['Apple', 'Facebook'], topic: 'Dynamic Programming', completed: false},
{id: '345', name: 'Minimum insertions to make string palindrome', leetcodeNumber: 1312, difficulty: 'Hard',
 companies: ['Amazon', 'Google'], topic: 'Dynamic Programming', completed: false},
{id: '346', name: 'Minimum insertions or deletions to convert string A to B', leetcodeNumber: 583, difficulty: 'Medium',
 companies: ['Microsoft', 'Apple'], topic: 'Dynamic Programming', completed: false},
{id: '347', name: 'Shortest common supersequence', leetcodeNumber: 1092, difficulty: 'Hard',
 companies: ['Facebook', 'Amazon'], topic: 'Dynamic Programming', completed: false},
{id: '348', name: 'Distinct subsequences', leetcodeNumber: 115, difficulty: 'Hard', companies: ['Google', 'Microsoft'],
 topic: 'Dynamic Programming', completed: false},
{id: '349', name: 'Edit distance', leetcodeNumber: 72, difficulty: 'Hard', companies: ['Apple', 'Facebook'],
 topic: 'Dynamic Programming', completed: false},
{id: '350', name: 'Wildcard matching', leetcodeNumber: 44, difficulty: 'Hard', companies: ['Amazon', 'Google'],
 topic: 'Dynamic Programming', completed: false},
{id: '351', name: 'Matrix chain multiplication', leetcodeNumber: null, difficulty: 'Hard',
 companies: ['Microsoft', 'Apple'], topic: 'Dynamic Programming', completed: false},
{id: '352', name: 'Minimum cost to cut the stick', leetcodeNumber: 1547, difficulty: 'Hard',
 companies: ['Facebook', 'Amazon'], topic: 'Dynamic Programming', completed: false},
{id: '353', name: 'Burst balloons', leetcodeNumber: 312, difficulty: 'Hard', companies: ['Google', 'Microsoft'],
 topic: 'Dynamic Programming', completed: false},
{id: '354', name: 'Palindrome partitioning II', leetcodeNumber: 132, difficulty: 'Hard',
 companies: ['Apple', 'Facebook'], topic: 'Dynamic Programming', completed: false},

// Tries
{id: '355', name: 'Trie Implementation and Operations', leetcodeNumber: 208, difficulty: 'Medium',
 companies: ['Amazon', 'Google'], topic: 'Tries', completed: false},
{id: '356', name: 'Trie Implementation and Advanced Operations', leetcodeNumber: null, difficulty: 'Medium',
 companies: ['Microsoft', 'Apple'], topic: 'Tries', completed: false},
{id: '357', name: 'Longest word with all prefixes', leetcodeNumber: 720, difficulty: 'Medium',
 companies: ['Facebook', 'Amazon'], topic: 'Tries', completed: false},
{id: '358', name: 'Number of distinct substrings in a string', leetcodeNumber: null, difficulty: 'Hard',
 companies: ['Google', 'Microsoft'], topic: 'Tries', completed: false},
{id: '359', name: 'Maximum XOR of two numbers in an array', leetcodeNumber: 421, difficulty: 'Medium',
 companies: ['Apple', 'Facebook'], topic: 'Tries', completed: false},
{id: '360', name: 'Maximum Xor with an element from an array', leetcodeNumber: 1707, difficulty: 'Hard',
 companies: ['Amazon', 'Google'], topic: 'Tries', completed: false},

// Strings(Advanced)
{id: '361', name: 'Reverse every word in a string', leetcodeNumber: 151, difficulty: 'Medium',
 companies: ['Microsoft', 'Apple'], topic: 'Strings(Advanced)', completed: false},
{id: '362', name: 'Minimum number of bracket reversals to make an expression balanced', leetcodeNumber: null,
 difficulty: 'Medium', companies: ['Facebook', 'Amazon'], topic: 'Strings(Advanced)', completed: false},
{id: '363', name: 'Count and say', leetcodeNumber: 38, difficulty: 'Medium', companies: ['Google', 'Microsoft'],
 topic: 'Strings(Advanced)', completed: false},
{id: '364', name: 'Rabin Karp Algorithm', leetcodeNumber: null, difficulty: 'Medium', companies: ['Apple', 'Facebook'],
 topic: 'Strings(Advanced)', completed: false},
{id: '365', name: 'Z function', leetcodeNumber: null, difficulty: 'Hard', companies: ['Amazon', 'Google'],
 topic: 'Strings(Advanced)', completed: false},
{id: '366', name: 'KMP Algorithm or LPS array', leetcodeNumber: 28, difficulty: 'Medium',
 companies: ['Microsoft', 'Apple'], topic: 'Strings(Advanced)', completed: false},
{id: '367', name: 'Shortest Palindrome', leetcodeNumber: 214, difficulty: 'Hard', companies: ['Facebook', 'Amazon'],
 topic: 'Strings(Advanced)', completed: false},
{id: '368', name: 'Longest happy prefix', leetcodeNumber: 1392, difficulty: 'Hard', companies: ['Google', 'Microsoft'],
 topic: 'Strings(Advanced)', completed: false},

// Maths
{id: '369', name: 'Sieve of Eratosthenes algorithm', leetcodeNumber: null, difficulty: 'Medium',
 companies: ['Apple', 'Facebook'], topic: 'Maths', completed: false},
{id: '370', name: 'Print all primes till N', leetcodeNumber: 204, difficulty: 'Medium', companies: ['Amazon', 'Google'],
 topic: 'Maths', completed: false},
{id: '371', name: 'Prime factorisation of a Number', leetcodeNumber: null, difficulty: 'Medium',
 companies: ['Microsoft', 'Apple'], topic: 'Maths', completed: false},
{id: '372', name: 'Count primes in range L to R', leetcodeNumber: null, difficulty: 'Hard',
 companies: ['Facebook', 'Amazon'], topic: 'Maths', completed: false},
];

function
App()
{
    const[problems, setProblems] = useState < Problem[] > (problemsData);
const[searchTerm, setSearchTerm] = useState('');
const[selectedDifficulty, setSelectedDifficulty] = useState < string > ('all');
const[selectedCompany, setSelectedCompany] = useState < string > ('all');
const[selectedTopic, setSelectedTopic] = useState < string > ('all');
const[showCompleted, setShowCompleted] = useState < string > ('all');
const[expandedTopics, setExpandedTopics] = useState < Set < string >> (new Set());

// Load
completion
status
from localStorage
    useEffect

(() = > {
const saved = localStorage.getItem('leetcode-progress');
if (saved)
{
    const
completedIds = JSON.parse(saved);
setProblems(prev= > prev.map(problem= > ({
    ...problem,
completed: completedIds.includes(problem.id)
})));
}
}, []);

// Save
completion
status
to
localStorage
const
saveProgress = (updatedProblems: Problem[]) = > {
    const
completedIds = updatedProblems.filter(p= > p.completed).map(p= > p.id);
localStorage.setItem('leetcode-progress', JSON.stringify(completedIds));
};

const
toggleProblem = (id: string) = > {
    const
updated = problems.map(problem= >
          problem.id == = id ? {...
problem, completed: !problem.completed}: problem
);
setProblems(updated);
saveProgress(updated);
};

const
filteredProblems = useMemo(() = > {
return problems.filter(problem= > {
    const
matchesSearch = problem.name.toLowerCase().includes(searchTerm.toLowerCase());
const
matchesDifficulty = selectedDifficulty == = 'all' | | problem.difficulty == = selectedDifficulty;
const
matchesCompany = selectedCompany == = 'all' | | problem.companies.includes(selectedCompany);
const
matchesTopic = selectedTopic == = 'all' | | problem.topic == = selectedTopic;
const
matchesCompleted = showCompleted == = 'all' | |
                                      (showCompleted === 'completed' & & problem.completed) | |
                                      (showCompleted === 'pending' & & !problem.completed);

return matchesSearch & & matchesDifficulty & & matchesCompany & & matchesTopic & & matchesCompleted;
});
}, [problems, searchTerm, selectedDifficulty, selectedCompany, selectedTopic, showCompleted]);

const
groupedProblems = useMemo(() = > {
    const
grouped: {[key: string]: Problem[]} = {};
filteredProblems.forEach(problem= > {
if (!grouped[problem.topic]) {
grouped[problem.topic] =[];
}
grouped[problem.topic].push(problem);
});
return grouped;
}, [filteredProblems]);

const
stats = useMemo(() = > {
const
total = problems.length;
const
completed = problems.filter(p= > p.completed).length;
const
easy = problems.filter(p= > p.difficulty == = 'Easy').length;
const
medium = problems.filter(p= > p.difficulty == = 'Medium').length;
const
hard = problems.filter(p= > p.difficulty == = 'Hard').length;
const
completedEasy = problems.filter(p= > p.difficulty == = 'Easy' & & p.completed).length;
const
completedMedium = problems.filter(p= > p.difficulty == = 'Medium' & & p.completed).length;
const
completedHard = problems.filter(p= > p.difficulty == = 'Hard' & & p.completed).length;

return {
    total,
    completed,
    percentage: total > 0 ? Math.round((completed / total) * 100): 0,
easy: {total: easy, completed: completedEasy},
medium: {total: medium, completed: completedMedium},
hard: {total: hard, completed: completedHard}
};
}, [problems]);

const
allCompanies = useMemo(() = > {
const
companies = new
Set < string > ();
problems.forEach(problem= > {
    problem.companies.forEach(company= > companies.add(company));
});
return Array.
from

(companies).sort();
}, [problems]);

const
allTopics = useMemo(() = > {
const
topics = new
Set < string > ();
problems.forEach(problem= > topics.add(problem.topic));
return Array.
from

(topics).sort();
}, [problems]);

const
toggleTopic = (topic: string) = > {
    const
newExpanded = new
Set(expandedTopics);
if (newExpanded.has(topic))
{
newExpanded.delete(topic);
} else {
newExpanded.add(topic);
}
setExpandedTopics(newExpanded);
};

const
getDifficultyColor = (difficulty: string) = > {
    switch(difficulty)
{
case
'Easy':
return 'text-emerald-700 bg-emerald-50 border-emerald-200';
case
'Medium':
return 'text-amber-700 bg-amber-50 border-amber-200';
case
'Hard':
return 'text-rose-700 bg-rose-50 border-rose-200';
default:
return 'text-gray-700 bg-gray-50 border-gray-200';
}
};

const
clearAllFilters = () = > {
    setSearchTerm('');
setSelectedDifficulty('all');
setSelectedCompany('all');
setSelectedTopic('all');
setShowCompleted('all');
};

return (
    < div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50" >
    < div className="container mx-auto px-4 py-8 max-w-7xl" >
    {/ * Header * /}
    < div className="text-center mb-10" >
    < div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg" >
    < BookOpen className="w-8 h-8 text-white" / >
    < / div >
    < h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-3" >
    LeetCode Progress Tracker
    < / h1 >
    < p className="text-xl text-gray-600 max-w-2xl mx-auto" >
    Master your coding interview preparation with comprehensive problem tracking and progress analytics
    < / p >
    < / div >

    {/ * Enhanced Stats Cards * /}
    < div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10" >
    < div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-all duration-300" >
    < div className="flex items-center justify-between mb-4" >
    < div >
    < p className="text-sm font-medium text-gray-600 mb-1" > Overall Progress < / p >
    < p className="text-3xl font-bold text-gray-900" > {stats.completed} < span className="text-lg text-gray-500" > / {stats.total} < / span > < / p >
    < / div >
    < div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-3 rounded-xl shadow-lg" >
    < Target className="w-7 h-7 text-white" / >
    < / div >
    < / div >
    < div className="space-y-2" >
    < div className="flex justify-between text-sm" >
    < span className="text-gray-600" > Completion Rate < / span >
    < span className="font-semibold text-blue-600" > {stats.percentage} % < / span >
    < / div >
    < div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden" >
    < div
    className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-700 ease-out shadow-sm"
    style={{width: `${stats.percentage} % `}}
    > < / div >
    < / div >
    < / div >
    < / div >

    < div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-all duration-300" >
    < div className="flex items-center justify-between mb-4" >
    < div >
    < p className="text-sm font-medium text-gray-600 mb-1" > Easy Problems < / p >
    < p className="text-3xl font-bold text-emerald-600" > {stats.easy.completed} < span className="text-lg text-gray-500" > / {stats.easy.total} < / span > < / p >
    < / div >
    < div className="bg-gradient-to-r from-emerald-500 to-green-500 p-3 rounded-xl shadow-lg" >
    < CheckCircle2 className="w-7 h-7 text-white" / >
    < / div >
    < / div >
    < div className="w-full bg-emerald-100 rounded-full h-2" >
    < div
    className="bg-gradient-to-r from-emerald-500 to-green-500 h-2 rounded-full transition-all duration-700"
    style={{width: `${stats.easy.total > 0 ? (stats.easy.completed / stats.easy.total) * 100: 0} %`}}
> < / div >
      < / div >
          < / div >

              < div
className = "bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-all duration-300" >
            < div
className = "flex items-center justify-between mb-4" >
            < div >
            < p
className = "text-sm font-medium text-gray-600 mb-1" > Medium
Problems < / p >
             < p
className = "text-3xl font-bold text-amber-600" > {stats.medium.completed} < span
className = "text-lg text-gray-500" > / {stats.medium.total} < / span > < / p >
                                                                            < / div >
                                                                                < div
className = "bg-gradient-to-r from-amber-500 to-orange-500 p-3 rounded-xl shadow-lg" >
            < TrendingUp
className = "w-7 h-7 text-white" / >
            < / div >
                < / div >
                    < div
className = "w-full bg-amber-100 rounded-full h-2" >
            < div
className = "bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full transition-all duration-700"
style = {{width: `${stats.medium.total > 0 ? (stats.medium.completed / stats.medium.total) * 100: 0} %`}}
> < / div >
      < / div >
          < / div >

              < div
className = "bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-all duration-300" >
            < div
className = "flex items-center justify-between mb-4" >
            < div >
            < p
className = "text-sm font-medium text-gray-600 mb-1" > Hard
Problems < / p >
             < p
className = "text-3xl font-bold text-rose-600" > {stats.hard.completed} < span
className = "text-lg text-gray-500" > / {stats.hard.total} < / span > < / p >
                                                                          < / div >
                                                                              < div
className = "bg-gradient-to-r from-rose-500 to-red-500 p-3 rounded-xl shadow-lg" >
            < Trophy
className = "w-7 h-7 text-white" / >
            < / div >
                < / div >
                    < div
className = "w-full bg-rose-100 rounded-full h-2" >
            < div
className = "bg-gradient-to-r from-rose-500 to-red-500 h-2 rounded-full transition-all duration-700"
style = {{width: `${stats.hard.total > 0 ? (stats.hard.completed / stats.hard.total) * 100: 0} %`}}
> < / div >
      < / div >
          < / div >
              < / div >

                  { / * Enhanced
Filters * /}
< div
className = "bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-8 border border-white/20" >
            < div
className = "flex items-center justify-between mb-6" >
            < h2
className = "text-2xl font-bold text-gray-900 flex items-center gap-3" >
            < Filter
className = "w-6 h-6 text-blue-600" / >
            Filter & Search
            < / h2 >
                < button
onClick = {clearAllFilters}
className = "px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
            Clear
All
< / button >
    < / div >

        < div
className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6" >
            < div
className = "lg:col-span-2" >
            < label
className = "block text-sm font-semibold text-gray-700 mb-3" > Search
Problems < / label >
             < div
className = "relative" >
            < Search
className = "absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" / >
            < input
type = "text"
placeholder = "Search by problem name..."
className = "w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200 text-gray-900 placeholder-gray-500"
value = {searchTerm}
onChange = {(e) = > setSearchTerm(e.target.value)}
/ >
< / div >
    < / div >

        < div >
        < label
className = "block text-sm font-semibold text-gray-700 mb-3" > Difficulty < / label >
                                                                              < select
className = "w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200 text-gray-900"
value = {selectedDifficulty}
onChange = {(e) = > setSelectedDifficulty(e.target.value)}
>
< option
value = "all" > All
Difficulties < / option >
                 < option
value = "Easy" > Easy < / option >
                          < option
value = "Medium" > Medium < / option >
                              < option
value = "Hard" > Hard < / option >
                          < / select >
                              < / div >

                                  < div >
                                  < label
className = "block text-sm font-semibold text-gray-700 mb-3" > Company < / label >
                                                                           < select
className = "w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200 text-gray-900"
value = {selectedCompany}
onChange = {(e) = > setSelectedCompany(e.target.value)}
>
< option
value = "all" > All
Companies < / option >
              {allCompanies.map(company= > (
                  < option key={company} value={company} > {company} < / option >
              ))}
< / select >
    < / div >

        < div >
        < label
className = "block text-sm font-semibold text-gray-700 mb-3" > Topic < / label >
                                                                         < select
className = "w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200 text-gray-900"
value = {selectedTopic}
onChange = {(e) = > setSelectedTopic(e.target.value)}
>
< option
value = "all" > All
Topics < / option >
           {allTopics.map(topic= > (
               < option key={topic} value={topic} > {topic} < / option >
           ))}
< / select >
    < / div >

        < div >
        < label
className = "block text-sm font-semibold text-gray-700 mb-3" > Status < / label >
                                                                          < select
className = "w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200 text-gray-900"
value = {showCompleted}
onChange = {(e) = > setShowCompleted(e.target.value)}
>
< option
value = "all" > All
Problems < / option >
             < option
value = "completed" > Completed < / option >
                                    < option
value = "pending" > Pending < / option >
                                < / select >
                                    < / div >
                                        < / div >
                                            < / div >

                                                { / * Enhanced
Problems
Table * /}
< div
className = "bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden" >
            {Object.entries(groupedProblems).map(([topic, topicProblems]) = > (
    < div key={topic} className="border-b border-gray-100 last:border-b-0" >
    < button
    onClick={() = > toggleTopic(topic)}
className = "w-full px-8 py-6 text-left bg-gradient-to-r from-gray-50 to-blue-50 hover:from-gray-100 hover:to-blue-100 transition-all duration-200 flex items-center justify-between group"
            >
            < div
className = "flex items-center gap-4" >
            < div
className = "flex items-center gap-2" >
            {expandedTopics.has(topic) ? (
    < ChevronDown className="w-5 h-5 text-gray-600 transition-transform duration-200" / >
): (
    < ChevronRight className="w-5 h-5 text-gray-600 transition-transform duration-200" / >
)}
< / div >
    < h3
className = "text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-200" >
            {topic}
            < / h3 >
                < span
className = "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800" >
            {topicProblems.length}
problems
< / span >
    < / div >
        < div
className = "flex items-center gap-3" >
            < div
className = "text-sm text-gray-600" >
            {topicProblems.filter(p= > p.completed).length} / {topicProblems.length}
completed
< / div >
    < div
className = "w-24 bg-gray-200 rounded-full h-2" >
            < div
className = "bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
style = {{
    width: `${topicProblems.length > 0 ? (topicProblems.filter(
    p= > p.completed).length / topicProblems.length) *100: 0} %`
}}
> < / div >
      < / div >
          < / div >
              < / button >

                  {(expandedTopics.has(topic) | | expandedTopics.size === 0) & & (
                      < div className="overflow-x-auto" >
                      < table className="w-full" >
                      < thead className="bg-gradient-to-r from-gray-50 to-slate-50" >
                      < tr >
                      < th className="px-8 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider" > Status < / th >
                      < th className="px-8 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider" > Problem Name < / th >
                      < th className="px-8 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider" > LeetCode  # </th>
                      < th className="px-8 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider" > Difficulty < / th >
                      < th className="px-8 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider" > Top Companies < / th >
                      < / tr >
                      < / thead >
                      < tbody className="divide-y divide-gray-100" >
                      {topicProblems.map((problem) = > (
    < tr
    key={problem.id}
    className={`hover:bg-gradient-to-r hover:from -blue-50 hover:to-indigo-50 transition-all duration-200 ${
    problem.completed ? 'bg-gradient-to-r from-emerald-50/50 to-green-50/50': ''
    }`}
    >
    < td className="px-8 py-5 whitespace-nowrap" >
    < button
    onClick={() = > toggleProblem(problem.id)}
className = "flex items-center space-x-2 hover:scale-110 transition-all duration-200 group"
            >
            {problem.completed ? (
    < CheckCircle2 className="w-6 h-6 text-emerald-600 group-hover:text-emerald-700" / >
): (
    < Circle className="w-6 h-6 text-gray-400 group-hover:text-gray-600" / >
)}
< / button >
    < / td >
        < td
className = "px-8 py-5" >
            < div
className = {`font - semibold
text - lg
transition - all
duration - 200 ${
    problem.completed
? 'text-emerald-700 line-through opacity-75'
: 'text-gray-900 hover:text-blue-700'
}`} >
{problem.name}
< / div >
    < / td >
        < td
className = "px-8 py-5 whitespace-nowrap" >
            {problem.leetcodeNumber ? (
    < span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-bold bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-sm" >
    # {problem.leetcodeNumber}
    < / span >
): (
    < span className="text-gray-400 text-sm font-medium" > N / A < / span >
)}
< / td >
    < td
className = "px-8 py-5 whitespace-nowrap" >
            < span
className = {`inline - flex
items - center
px - 3
py - 1.5
rounded - lg
text - sm
font - bold
border ${getDifficultyColor(problem.difficulty)}
shadow - sm
`} >
{problem.difficulty}
< / span >
    < / td >
        < td
className = "px-8 py-5" >
            < div
className = "flex flex-wrap gap-2" >
            {problem.companies.slice(0, 3).map((company, idx) = > (
    < span key={idx} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-white border border-gray-200 text-gray-800 shadow-sm hover:shadow-md transition-all duration-200" >
    < CompanyLogo company={company} size="sm" / >
    {company}
    < / span >
))}
{problem.companies.length > 3 & & (
    < span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-600 border border-gray-200" >
    +{problem.companies.length - 3} more
    < / span >
)}
< / div >
    < / td >
        < / tr >
))}
< / tbody >
    < / table >
        < / div >
)}
< / div >
))}
< / div >

    {filteredProblems.length == = 0 & & (
    < div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 mt-8" >
    < div className="text-gray-400 mb-6" >
    < Search className="w-16 h-16 mx-auto" / >
    < / div >
    < h3 className="text-2xl font-bold text-gray-900 mb-3" > No problems found < / h3 >
    < p className="text-gray-600 text-lg mb-6" > Try adjusting your search criteria or filters to find what you're looking for.</p>
    < button
    onClick={clearAllFilters}
    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-lg hover:shadow-xl"
    >
    Clear All Filters
    < / button >
    < / div >
)}

{ / * Footer * /}
< div
className = "text-center mt-12 py-8 border-t border-gray-200" >
            < p
className = "text-gray-600 flex items-center justify-center gap-2" >
            < Clock
className = "w-4 h-4" / >
            Progress is automatically
saved
to
your
browser
< / p >
    < / div >
        < / div >
            < / div >
);
}

export
default
App;