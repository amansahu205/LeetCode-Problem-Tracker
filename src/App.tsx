import React, { useState, useEffect, useMemo, useRef } from 'react';
import ReactDOM from 'react-dom';
import {
  Search, Filter, CheckCircle2, Circle, ChevronDown, ChevronRight, BookOpen, Target, TrendingUp, Trophy, Eye, BarChart3, ExternalLink, Play, Clock, Users, Zap, Award, Star
} from 'lucide-react';

// --- INTERFACES ---
interface Problem {
  id: string;
  name: string;
  leetcodeNumber?: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  companies: string[];
  topic: string;
  completed: boolean;
  starred: boolean;
}

interface CompanyTooltipProps {
  companies: string[];
  visibleCount: number;
}

// --- CONSTANTS ---
const COMPANY_DOMAINS: { [key: string]: string } = {
  'Google': 'google.com', 'Amazon': 'amazon.com', 'Microsoft': 'microsoft.com', 'Apple': 'apple.com', 'Facebook': 'facebook.com', 'Meta': 'meta.com', 'Netflix': 'netflix.com', 'Tesla': 'tesla.com', 'Bloomberg': 'bloomberg.com', 'Oracle': 'oracle.com', 'Nvidia': 'nvidia.com', 'Adobe': 'adobe.com', 'Uber': 'uber.com', 'Airbnb': 'airbnb.com', 'LinkedIn': 'linkedin.com', 'Twitter': 'twitter.com', 'X': 'x.com', 'Spotify': 'spotify.com', 'Salesforce': 'salesforce.com', 'ByteDance': 'bytedance.com', 'TikTok': 'tiktok.com', 'Stripe': 'stripe.com', 'Shopify': 'shopify.com', 'Snap': 'snap.com', 'Pinterest': 'pinterest.com', 'Dropbox': 'dropbox.com', 'Square': 'squareup.com', 'Palantir': 'palantir.com', 'Coinbase': 'coinbase.com', 'Zoom': 'zoom.us', 'ServiceNow': 'servicenow.com', 'Databricks': 'databricks.com', 'Snowflake': 'snowflake.com', 'Twilio': 'twilio.com', 'MongoDB': 'mongodb.com', 'Atlassian': 'atlassian.com', 'Slack': 'slack.com', 'Workday': 'workday.com', 'Splunk': 'splunk.com', 'VMware': 'vmware.com', 'Intel': 'intel.com', 'AMD': 'amd.com', 'Qualcomm': 'qualcomm.com', 'IBM': 'ibm.com', 'SAP': 'sap.com', 'Cisco': 'cisco.com', 'JPMorgan': 'jpmorgan.com', 'Goldman Sachs': 'goldmansachs.com', 'Morgan Stanley': 'morganstanley.com', 'Citadel': 'citadel.com', 'Two Sigma': 'twosigma.com', 'Jane Street': 'janestreet.com', 'DE Shaw': 'deshaw.com', 'Jump Trading': 'jumptrading.com', 'Hudson River Trading': 'hudsonrivertrading.com', 'Robinhood': 'robinhood.com', 'DoorDash': 'doordash.com', 'Instacart': 'instacart.com', 'Lyft': 'lyft.com', 'Reddit': 'reddit.com', 'Discord': 'discord.com', 'Roblox': 'roblox.com', 'Unity': 'unity.com', 'Epic Games': 'epicgames.com', 'Riot Games': 'riotgames.com'
};

const DUMMY_COMPANIES_1 = ['Google', 'Amazon', 'Microsoft', 'Apple', 'Facebook', 'Bloomberg', 'Oracle', 'Adobe', 'Nvidia', 'LinkedIn'];
const DUMMY_COMPANIES_2 = ['Meta', 'Netflix', 'Tesla', 'Salesforce', 'Uber', 'Airbnb', 'Spotify', 'Twitter', 'ByteDance', 'Stripe'];
const DUMMY_COMPANIES_3 = ['Shopify', 'Snap', 'Pinterest', 'Dropbox', 'Square', 'Palantir', 'Coinbase', 'Zoom', 'ServiceNow', 'Databricks'];
const DUMMY_COMPANIES_4 = ['Snowflake', 'Twilio', 'MongoDB', 'Atlassian', 'Slack', 'Workday', 'Splunk', 'VMware', 'Intel', 'AMD'];
const DUMMY_COMPANIES_5 = ['Qualcomm', 'IBM', 'SAP', 'Cisco', 'JPMorgan', 'Goldman Sachs', 'Morgan Stanley', 'Citadel', 'Two Sigma', 'Jane Street'];

// --- FULL PROBLEM DATA ---
const problemsData: Omit<Problem, 'completed' | 'starred'>[] = [
    { id: 'bm1', name: 'Count all Digits of a Number', topic: 'Basic Maths', difficulty: 'Easy', companies: DUMMY_COMPANIES_1 },
    { id: 'bm2', name: 'Count number of odd digits in a number', topic: 'Basic Maths', difficulty: 'Easy', companies: DUMMY_COMPANIES_2 },
    { id: 'bm3', name: 'Reverse a number', topic: 'Basic Maths', difficulty: 'Easy', leetcodeNumber: 7, companies: DUMMY_COMPANIES_3 },
    { id: 'bm4', name: 'Palindrome Number', topic: 'Basic Maths', difficulty: 'Easy', leetcodeNumber: 9, companies: DUMMY_COMPANIES_4 },
    { id: 'bm5', name: 'Return the Largest Digit in a Number', topic: 'Basic Maths', difficulty: 'Easy', companies: DUMMY_COMPANIES_5 },
    { id: 'bm6', name: 'Divisors of a Number', topic: 'Basic Maths', difficulty: 'Easy', companies: DUMMY_COMPANIES_1 },
    { id: 'bm7', name: 'Factorial of a given number', topic: 'Basic Maths', difficulty: 'Easy', companies: DUMMY_COMPANIES_2 },
    { id: 'bm8', name: 'Check if the Number is Armstrong', topic: 'Basic Maths', difficulty: 'Easy', companies: DUMMY_COMPANIES_3 },
    { id: 'bm9', name: 'Check for Perfect Number', topic: 'Basic Maths', difficulty: 'Easy', leetcodeNumber: 507, companies: DUMMY_COMPANIES_4 },
    { id: 'bm10', name: 'Check for Prime Number', topic: 'Basic Maths', difficulty: 'Easy', companies: DUMMY_COMPANIES_5 },
    { id: 'bm11', name: 'Count of Prime Numbers till N', topic: 'Basic Maths', difficulty: 'Medium', leetcodeNumber: 204, companies: DUMMY_COMPANIES_1 },
    { id: 'bm12', name: 'GCD of Two Numbers', topic: 'Basic Maths', difficulty: 'Easy', companies: DUMMY_COMPANIES_2 },
    { id: 'bm13', name: 'LCM of two numbers', topic: 'Basic Maths', difficulty: 'Easy', companies: DUMMY_COMPANIES_3 },
    { id: 'barr1', name: 'Sum of Array Elements', topic: 'Basic Arrays', difficulty: 'Easy', companies: DUMMY_COMPANIES_4 },
    { id: 'barr2', name: 'Count of odd numbers in array', topic: 'Basic Arrays', difficulty: 'Easy', companies: DUMMY_COMPANIES_5 },
    { id: 'barr3', name: 'Check if the Array is Sorted I', topic: 'Basic Arrays', difficulty: 'Easy', companies: DUMMY_COMPANIES_1 },
    { id: 'barr4', name: 'Reverse an array', topic: 'Basic Arrays', difficulty: 'Easy', companies: DUMMY_COMPANIES_2 },
    { id: 'bhash1', name: 'Highest Occurring Element in an Array', topic: 'Basic Hashing', difficulty: 'Easy', companies: DUMMY_COMPANIES_3 },
    { id: 'bhash2', name: 'Second Highest Occurring Element', topic: 'Basic Hashing', difficulty: 'Medium', companies: DUMMY_COMPANIES_4 },
    { id: 'bhash3', name: 'Sum of Highest and Lowest Frequency', topic: 'Basic Hashing', difficulty: 'Easy', companies: DUMMY_COMPANIES_5 },
    { id: 'bstr1', name: 'Reverse a String II', topic: 'Basic Strings', difficulty: 'Easy', leetcodeNumber: 541, companies: DUMMY_COMPANIES_1 },
    { id: 'bstr2', name: 'Palindrome Check', topic: 'Basic Strings', difficulty: 'Easy', leetcodeNumber: 125, companies: DUMMY_COMPANIES_2 },
    { id: 'bstr3', name: 'Largest Odd Number in a String', topic: 'Basic Strings', difficulty: 'Easy', leetcodeNumber: 1903, companies: DUMMY_COMPANIES_3 },
    { id: 'bstr4', name: 'Longest Common Prefix', topic: 'Basic Strings', difficulty: 'Easy', leetcodeNumber: 14, companies: DUMMY_COMPANIES_4 },
    { id: 'bstr5', name: 'Isomorphic String', topic: 'Basic Strings', difficulty: 'Easy', leetcodeNumber: 205, companies: DUMMY_COMPANIES_5 },
    { id: 'bstr6', name: 'Rotate String', topic: 'Basic Strings', difficulty: 'Easy', leetcodeNumber: 796, companies: DUMMY_COMPANIES_1 },
    { id: 'bstr7', name: 'Valid Anagram', topic: 'Basic Strings', difficulty: 'Easy', leetcodeNumber: 242, companies: DUMMY_COMPANIES_2 },
    { id: 'bstr8', name: 'Sort Characters by Frequency', topic: 'Basic Strings', difficulty: 'Medium', leetcodeNumber: 451, companies: DUMMY_COMPANIES_3 },
    { id: 'brec1', name: 'Sum of First N Numbers', topic: 'Basic Recursion', difficulty: 'Easy', companies: DUMMY_COMPANIES_4 },
    { id: 'brec2', name: 'Factorial of a Given Number', topic: 'Basic Recursion', difficulty: 'Easy', companies: DUMMY_COMPANIES_5 },
    { id: 'brec3', name: 'Sum of Array Elements', topic: 'Basic Recursion', difficulty: 'Easy', companies: DUMMY_COMPANIES_1 },
    { id: 'brec4', name: 'Reverse a String I', topic: 'Basic Recursion', difficulty: 'Easy', leetcodeNumber: 344, companies: DUMMY_COMPANIES_2 },
    { id: 'brec5', name: 'Check if String is Palindrome or Not', topic: 'Basic Recursion', difficulty: 'Easy', companies: DUMMY_COMPANIES_3 },
    { id: 'brec6', name: 'Check if a Number is Prime or Not', topic: 'Basic Recursion', difficulty: 'Easy', companies: DUMMY_COMPANIES_4 },
    { id: 'brec7', name: 'Reverse an array', topic: 'Basic Recursion', difficulty: 'Easy', companies: DUMMY_COMPANIES_5 },
    { id: 'brec8', name: 'Check if the Array is Sorted II', topic: 'Basic Recursion', difficulty: 'Easy', companies: DUMMY_COMPANIES_1 },
    { id: 'brec9', name: 'Sum of Digits in a Given Number', topic: 'Basic Recursion', difficulty: 'Easy', companies: DUMMY_COMPANIES_2 },
    { id: 'brec10', name: 'Fibonacci Number', topic: 'Basic Recursion', difficulty: 'Easy', leetcodeNumber: 509, companies: DUMMY_COMPANIES_3 },
    { id: 'sort1', name: 'Selection Sort', topic: 'Sorting', difficulty: 'Easy', companies: DUMMY_COMPANIES_4 },
    { id: 'sort2', name: 'Bubble Sort', topic: 'Sorting', difficulty: 'Easy', companies: DUMMY_COMPANIES_5 },
    { id: 'sort3', name: 'Insertion Sorting', topic: 'Sorting', difficulty: 'Easy', companies: DUMMY_COMPANIES_1 },
    { id: 'sort4', name: 'Merge Sorting', topic: 'Sorting', difficulty: 'Medium', companies: DUMMY_COMPANIES_2 },
    { id: 'sort5', name: 'Quick Sorting', topic: 'Sorting', difficulty: 'Medium', companies: DUMMY_COMPANIES_3 },
    { id: 'arr1', name: 'Linear Search', topic: 'Arrays', difficulty: 'Easy', companies: DUMMY_COMPANIES_4 },
    { id: 'arr2', name: 'Largest Element', topic: 'Arrays', difficulty: 'Easy', companies: DUMMY_COMPANIES_5 },
    { id: 'arr3', name: 'Second Largest Element', topic: 'Arrays', difficulty: 'Easy', companies: DUMMY_COMPANIES_1 },
    { id: 'arr4', name: 'Maximum Consecutive Ones', topic: 'Arrays', difficulty: 'Easy', leetcodeNumber: 485, companies: DUMMY_COMPANIES_2 },
    { id: 'arr5', name: 'Left Rotate Array by One', topic: 'Arrays', difficulty: 'Easy', companies: DUMMY_COMPANIES_3 },
    { id: 'arr6', name: 'Left Rotate Array by K Places', topic: 'Arrays', difficulty: 'Medium', leetcodeNumber: 189, companies: DUMMY_COMPANIES_4 },
    { id: 'arr7', name: 'Move Zeros to End', topic: 'Arrays', difficulty: 'Easy', leetcodeNumber: 283, companies: DUMMY_COMPANIES_5 },
    { id: 'arr8', name: 'Remove duplicates from sorted array', topic: 'Arrays', difficulty: 'Easy', leetcodeNumber: 26, companies: DUMMY_COMPANIES_1 },
    { id: 'arr9', name: 'Find missing number', topic: 'Arrays', difficulty: 'Easy', leetcodeNumber: 268, companies: DUMMY_COMPANIES_2 },
    { id: 'arr10', name: 'Union of two sorted arrays', topic: 'Arrays', difficulty: 'Easy', companies: DUMMY_COMPANIES_3 },
    { id: 'arr11', name: 'Intersection of two sorted arrays', topic: 'Arrays', difficulty: 'Easy', leetcodeNumber: 349, companies: DUMMY_COMPANIES_4 },
    { id: 'arr12', name: 'Leaders in an Array', topic: 'Arrays', difficulty: 'Medium', companies: DUMMY_COMPANIES_5 },
    { id: 'arr13', name: 'Rearrange array elements by sign', topic: 'Arrays', difficulty: 'Medium', leetcodeNumber: 2149, companies: DUMMY_COMPANIES_1 },
    { id: 'arr14', name: 'Print the matrix in spiral manner', topic: 'Arrays', difficulty: 'Medium', leetcodeNumber: 54, companies: DUMMY_COMPANIES_2 },
    { id: 'arr15', name: "Pascal's Triangle I", topic: 'Arrays', difficulty: 'Easy', leetcodeNumber: 118, companies: DUMMY_COMPANIES_3 },
    { id: 'arr16', name: "Pascal's Triangle II", topic: 'Arrays', difficulty: 'Easy', leetcodeNumber: 119, companies: DUMMY_COMPANIES_4 },
    { id: 'arr17', name: "Pascal's Triangle III", topic: 'Arrays', difficulty: 'Medium', companies: DUMMY_COMPANIES_5 },
    { id: 'arr18', name: 'Rotate matrix by 90 degrees', topic: 'Arrays', difficulty: 'Medium', leetcodeNumber: 48, companies: DUMMY_COMPANIES_1 },
    { id: 'arr19', name: 'Two Sum', topic: 'Arrays', difficulty: 'Easy', leetcodeNumber: 1, companies: DUMMY_COMPANIES_2 },
    { id: 'arr20', name: '3 Sum', topic: 'Arrays', difficulty: 'Medium', leetcodeNumber: 15, companies: DUMMY_COMPANIES_3 },
    { id: 'arr21', name: '4 Sum', topic: 'Arrays', difficulty: 'Medium', leetcodeNumber: 18, companies: DUMMY_COMPANIES_4 },
    { id: 'arr22', name: "Sort an array of 0's 1's and 2's", topic: 'Arrays', difficulty: 'Medium', leetcodeNumber: 75, companies: DUMMY_COMPANIES_5 },
    { id: 'arr23', name: "Kadane's Algorithm", topic: 'Arrays', difficulty: 'Medium', leetcodeNumber: 53, companies: DUMMY_COMPANIES_1 },
    { id: 'arr24', name: 'Next Permutation', topic: 'Arrays', difficulty: 'Medium', leetcodeNumber: 31, companies: DUMMY_COMPANIES_2 },
    { id: 'arr25', name: 'Majority Element-I', topic: 'Arrays', difficulty: 'Easy', leetcodeNumber: 169, companies: DUMMY_COMPANIES_3 },
    { id: 'arr26', name: 'Majority Element-II', topic: 'Arrays', difficulty: 'Medium', leetcodeNumber: 229, companies: DUMMY_COMPANIES_4 },
    { id: 'arr27', name: 'Find the repeating and missing number', topic: 'Arrays', difficulty: 'Medium', companies: DUMMY_COMPANIES_5 },
    { id: 'arr28', name: 'Count Inversions', topic: 'Arrays', difficulty: 'Hard', companies: DUMMY_COMPANIES_1 },
    { id: 'arr29', name: 'Reverse Pairs', topic: 'Arrays', difficulty: 'Hard', leetcodeNumber: 493, companies: DUMMY_COMPANIES_2 },
    { id: 'arr30', name: 'Maximum Product Subarray in an Array', topic: 'Arrays', difficulty: 'Medium', leetcodeNumber: 152, companies: DUMMY_COMPANIES_3 },
    { id: 'arr31', name: 'Merge two sorted arrays without extra space', topic: 'Arrays', difficulty: 'Medium', leetcodeNumber: 88, companies: DUMMY_COMPANIES_4 },
    { id: 'hash1', name: 'Longest Consecutive Sequence in an Array', topic: 'Hashing', difficulty: 'Medium', leetcodeNumber: 128, companies: DUMMY_COMPANIES_5 },
    { id: 'hash2', name: 'Longest subarray with sum K', topic: 'Hashing', difficulty: 'Medium', companies: DUMMY_COMPANIES_1 },
    { id: 'hash3', name: 'Count subarrays with given sum', topic: 'Hashing', difficulty: 'Medium', leetcodeNumber: 560, companies: DUMMY_COMPANIES_2 },
    { id: 'hash4', name: 'Count subarrays with given xor K', topic: 'Hashing', difficulty: 'Hard', companies: DUMMY_COMPANIES_3 },
    { id: 'bs1', name: 'Search X in sorted array', topic: 'Binary Search', difficulty: 'Easy', leetcodeNumber: 704, companies: DUMMY_COMPANIES_4 },
    { id: 'bs2', name: 'Lower Bound', topic: 'Binary Search', difficulty: 'Easy', companies: DUMMY_COMPANIES_5 },
    { id: 'bs3', name: 'Upper Bound', topic: 'Binary Search', difficulty: 'Easy', companies: DUMMY_COMPANIES_1 },
    { id: 'bs4', name: 'Search insert position', topic: 'Binary Search', difficulty: 'Easy', leetcodeNumber: 35, companies: DUMMY_COMPANIES_2 },
    { id: 'bs5', name: 'Floor and Ceil in Sorted Array', topic: 'Binary Search', difficulty: 'Easy', companies: DUMMY_COMPANIES_3 },
    { id: 'bs6', name: 'First and last occurrence', topic: 'Binary Search', difficulty: 'Medium', leetcodeNumber: 34, companies: DUMMY_COMPANIES_4 },
    { id: 'bs7', name: 'Search in rotated sorted array-I', topic: 'Binary Search', difficulty: 'Medium', leetcodeNumber: 33, companies: DUMMY_COMPANIES_5 },
    { id: 'bs8', name: 'Search in rotated sorted array-II', topic: 'Binary Search', difficulty: 'Medium', leetcodeNumber: 81, companies: DUMMY_COMPANIES_1 },
    { id: 'bs9', name: 'Find minimum in Rotated Sorted Array', topic: 'Binary Search', difficulty: 'Medium', leetcodeNumber: 153, companies: DUMMY_COMPANIES_2 },
    { id: 'bs10', name: 'Find out how many times the array is rotated', topic: 'Binary Search', difficulty: 'Medium', companies: DUMMY_COMPANIES_3 },
    { id: 'bs11', name: 'Single element in sorted array', topic: 'Binary Search', difficulty: 'Medium', leetcodeNumber: 540, companies: DUMMY_COMPANIES_4 },
    { id: 'bs12', name: 'Find square root of a number', topic: 'Binary Search', difficulty: 'Easy', leetcodeNumber: 69, companies: DUMMY_COMPANIES_5 },
    { id: 'bs13', name: 'Find Nth root of a number', topic: 'Binary Search', difficulty: 'Medium', companies: DUMMY_COMPANIES_1 },
    { id: 'bs14', name: 'Find the smallest divisor', topic: 'Binary Search', difficulty: 'Medium', leetcodeNumber: 1283, companies: DUMMY_COMPANIES_2 },
    { id: 'bs15', name: 'Koko eating bananas', topic: 'Binary Search', difficulty: 'Medium', leetcodeNumber: 875, companies: DUMMY_COMPANIES_3 },
    { id: 'bs16', name: 'Minimum days to make M bouquets', topic: 'Binary Search', difficulty: 'Medium', leetcodeNumber: 1482, companies: DUMMY_COMPANIES_4 },
    { id: 'bs17', name: 'Aggressive Cows', topic: 'Binary Search', difficulty: 'Hard', companies: DUMMY_COMPANIES_5 },
    { id: 'bs18', name: 'Book Allocation Problem', topic: 'Binary Search', difficulty: 'Hard', companies: DUMMY_COMPANIES_1 },
    { id: 'bs19', name: 'Find peak element', topic: 'Binary Search', difficulty: 'Medium', leetcodeNumber: 162, companies: DUMMY_COMPANIES_2 },
    { id: 'bs20', name: 'Median of 2 sorted arrays', topic: 'Binary Search', difficulty: 'Hard', leetcodeNumber: 4, companies: DUMMY_COMPANIES_3 },
    { id: 'bs21', name: 'Minimize Max Distance to Gas Station', topic: 'Binary Search', difficulty: 'Hard', leetcodeNumber: 774, companies: DUMMY_COMPANIES_4 },
    { id: 'bs22', name: 'Kth element of 2 sorted arrays', topic: 'Binary Search', difficulty: 'Hard', companies: DUMMY_COMPANIES_5 },
    { id: 'bs23', name: 'Split array - largest sum', topic: 'Binary Search', difficulty: 'Hard', leetcodeNumber: 410, companies: DUMMY_COMPANIES_1 },
    { id: 'bs24', name: "Find row with maximum 1's", topic: 'Binary Search', difficulty: 'Medium', companies: DUMMY_COMPANIES_2 },
    { id: 'bs25', name: 'Search in a 2D matrix', topic: 'Binary Search', difficulty: 'Medium', leetcodeNumber: 74, companies: DUMMY_COMPANIES_3 },
    { id: 'bs26', name: 'Search in 2D matrix - II', topic: 'Binary Search', difficulty: 'Medium', leetcodeNumber: 240, companies: DUMMY_COMPANIES_4 },
    { id: 'bs27', name: 'Find Peak Element', topic: 'Binary Search', difficulty: 'Medium', leetcodeNumber: 162, companies: DUMMY_COMPANIES_5 },
    { id: 'bs28', name: 'Matrix Median', topic: 'Binary Search', difficulty: 'Hard', companies: DUMMY_COMPANIES_1 },
    { id: 'rec1', name: 'Pow(x,n)', topic: 'Recursion', difficulty: 'Medium', leetcodeNumber: 50, companies: DUMMY_COMPANIES_2 },
    { id: 'rec2', name: 'Generate Parentheses', topic: 'Recursion', difficulty: 'Medium', leetcodeNumber: 22, companies: DUMMY_COMPANIES_3 },
    { id: 'rec3', name: 'Power Set', topic: 'Recursion', difficulty: 'Medium', leetcodeNumber: 78, companies: DUMMY_COMPANIES_4 },
    { id: 'rec4', name: 'Check if there exists a subsequence with sum K', topic: 'Recursion', difficulty: 'Medium', companies: DUMMY_COMPANIES_5 },
    { id: 'rec5', name: 'Count all subsequences with sum K', topic: 'Recursion', difficulty: 'Medium', companies: DUMMY_COMPANIES_1 },
    { id: 'rec6', name: 'Combination Sum', topic: 'Recursion', difficulty: 'Medium', leetcodeNumber: 39, companies: DUMMY_COMPANIES_2 },
    { id: 'rec7', name: 'Combination Sum II', topic: 'Recursion', difficulty: 'Medium', leetcodeNumber: 40, companies: DUMMY_COMPANIES_3 },
    { id: 'rec8', name: 'Subsets I', topic: 'Recursion', difficulty: 'Medium', leetcodeNumber: 78, companies: DUMMY_COMPANIES_4 },
    { id: 'rec9', name: 'Subsets II', topic: 'Recursion', difficulty: 'Medium', leetcodeNumber: 90, companies: DUMMY_COMPANIES_5 },
    { id: 'rec10', name: 'Combination Sum III', topic: 'Recursion', difficulty: 'Medium', leetcodeNumber: 216, companies: DUMMY_COMPANIES_1 },
    { id: 'rec11', name: 'Letter Combinations of a Phone Number', topic: 'Recursion', difficulty: 'Medium', leetcodeNumber: 17, companies: DUMMY_COMPANIES_2 },
    { id: 'rec12', name: 'Palindrome partitioning', topic: 'Recursion', difficulty: 'Medium', leetcodeNumber: 131, companies: DUMMY_COMPANIES_3 },
    { id: 'rec13', name: 'Word Search', topic: 'Recursion', difficulty: 'Medium', leetcodeNumber: 79, companies: DUMMY_COMPANIES_4 },
    { id: 'rec14', name: 'N Queen', topic: 'Recursion', difficulty: 'Hard', leetcodeNumber: 51, companies: DUMMY_COMPANIES_5 },
    { id: 'rec15', name: 'Rat in a Maze', topic: 'Recursion', difficulty: 'Hard', companies: DUMMY_COMPANIES_1 },
    { id: 'rec16', name: 'M Coloring Problem', topic: 'Recursion', difficulty: 'Hard', companies: DUMMY_COMPANIES_2 },
    { id: 'rec17', name: 'Sudoko Solver', topic: 'Recursion', difficulty: 'Hard', leetcodeNumber: 37, companies: DUMMY_COMPANIES_3 },
    { id: 'll1', name: 'Traversal in Linked List', topic: 'Linked List', difficulty: 'Easy', companies: DUMMY_COMPANIES_4 },
    { id: 'll2', name: 'Deletion of the head of LL', topic: 'Linked List', difficulty: 'Easy', companies: DUMMY_COMPANIES_5 },
    { id: 'll3', name: 'Deletion of the tail of LL', topic: 'Linked List', difficulty: 'Easy', companies: DUMMY_COMPANIES_1 },
    { id: 'll4', name: 'Deletion of the Kth element of LL', topic: 'Linked List', difficulty: 'Easy', companies: DUMMY_COMPANIES_2 },
    { id: 'll5', name: 'Delete the element with value X', topic: 'Linked List', difficulty: 'Easy', companies: DUMMY_COMPANIES_3 },
    { id: 'll6', name: 'Insertion at the head of LL', topic: 'Linked List', difficulty: 'Easy', companies: DUMMY_COMPANIES_4 },
    { id: 'll7', name: 'Insertion at the tail of LL', topic: 'Linked List', difficulty: 'Easy', companies: DUMMY_COMPANIES_5 },
    { id: 'll8', name: 'Insertion at the Kth position of LL', topic: 'Linked List', difficulty: 'Easy', companies: DUMMY_COMPANIES_1 },
    { id: 'll9', name: 'Insertion before the value X in LL', topic: 'Linked List', difficulty: 'Easy', companies: DUMMY_COMPANIES_2 },
    { id: 'll10', name: 'Introduction to Doubly LL', topic: 'Linked List', difficulty: 'Easy', companies: DUMMY_COMPANIES_3 },
    { id: 'll11', name: 'Deletion in Doubly LL', topic: 'Linked List', difficulty: 'Easy', companies: DUMMY_COMPANIES_4 },
    { id: 'll12', name: 'Insertion in DLL', topic: 'Linked List', difficulty: 'Easy', companies: DUMMY_COMPANIES_5 },
    { id: 'll13', name: 'Convert Array to DLL', topic: 'Linked List', difficulty: 'Easy', companies: DUMMY_COMPANIES_1 },
    { id: 'll14', name: 'Delete head of DLL', topic: 'Linked List', difficulty: 'Easy', companies: DUMMY_COMPANIES_2 },
    { id: 'll15', name: 'Delete Tail of DLL', topic: 'Linked List', difficulty: 'Easy', companies: DUMMY_COMPANIES_3 },
    { id: 'll16', name: 'Delete Kth Element of DLL', topic: 'Linked List', difficulty: 'Easy', companies: DUMMY_COMPANIES_4 },
    { id: 'll17', name: 'Removing given node in DLL', topic: 'Linked List', difficulty: 'Easy', companies: DUMMY_COMPANIES_5 },
    { id: 'll18', name: 'Insert node before head in DLL', topic: 'Linked List', difficulty: 'Easy', companies: DUMMY_COMPANIES_1 },
    { id: 'll19', name: 'Insert node before tail in DLL', topic: 'Linked List', difficulty: 'Easy', companies: DUMMY_COMPANIES_2 },
    { id: 'll20', name: 'Insert node before (kth node) in DLL', topic: 'Linked List', difficulty: 'Easy', companies: DUMMY_COMPANIES_3 },
    { id: 'll21', name: 'Insert before given node in DLL', topic: 'Linked List', difficulty: 'Easy', companies: DUMMY_COMPANIES_4 },
    { id: 'll22', name: 'Add two numbers in LL', topic: 'Linked List', difficulty: 'Medium', leetcodeNumber: 2, companies: DUMMY_COMPANIES_5 },
    { id: 'll23', name: 'Segregate odd and even nodes in LL', topic: 'Linked List', difficulty: 'Medium', leetcodeNumber: 328, companies: DUMMY_COMPANIES_1 },
    { id: 'll24', name: "Sort a LL of 0's 1's and 2's", topic: 'Linked List', difficulty: 'Medium', companies: DUMMY_COMPANIES_2 },
    { id: 'll25', name: 'Remove Nth node from the back of the LL', topic: 'Linked List', difficulty: 'Medium', leetcodeNumber: 19, companies: DUMMY_COMPANIES_3 },
    { id: 'll26', name: 'Reverse a LL', topic: 'Linked List', difficulty: 'Easy', leetcodeNumber: 206, companies: DUMMY_COMPANIES_4 },
    { id: 'll27', name: 'Add one to a number represented by LL', topic: 'Linked List', difficulty: 'Medium', companies: DUMMY_COMPANIES_5 },
    { id: 'll28', name: 'Check if LL is palindrome or not', topic: 'Linked List', difficulty: 'Easy', leetcodeNumber: 234, companies: DUMMY_COMPANIES_1 },
    { id: 'll29', name: 'Find the intersection point of Y LL', topic: 'Linked List', difficulty: 'Easy', leetcodeNumber: 160, companies: DUMMY_COMPANIES_2 },
    { id: 'll30', name: 'Detect a loop in LL', topic: 'Linked List', difficulty: 'Easy', leetcodeNumber: 141, companies: DUMMY_COMPANIES_3 },
    { id: 'll31', name: 'Find the starting point in LL', topic: 'Linked List', difficulty: 'Medium', leetcodeNumber: 142, companies: DUMMY_COMPANIES_4 },
    { id: 'll32', name: 'Find Middle of Linked List', topic: 'Linked List', difficulty: 'Easy', leetcodeNumber: 876, companies: DUMMY_COMPANIES_5 },
    { id: 'll33', name: 'Length of loop in LL', topic: 'Linked List', difficulty: 'Medium', companies: DUMMY_COMPANIES_1 },
    { id: 'll34', name: 'Delete the middle node in LL', topic: 'Linked List', difficulty: 'Medium', leetcodeNumber: 2095, companies: DUMMY_COMPANIES_2 },
    { id: 'll35', name: 'Reverse LL in group of given size K', topic: 'Linked List', difficulty: 'Hard', leetcodeNumber: 25, companies: DUMMY_COMPANIES_3 },
    { id: 'll36', name: 'Rotate a LL', topic: 'Linked List', difficulty: 'Medium', leetcodeNumber: 61, companies: DUMMY_COMPANIES_4 },
    { id: 'll37', name: 'Merge two Sorted Lists', topic: 'Linked List', difficulty: 'Easy', leetcodeNumber: 21, companies: DUMMY_COMPANIES_5 },
    { id: 'll38', name: 'Flattening of LL', topic: 'Linked List', difficulty: 'Hard', leetcodeNumber: 430, companies: DUMMY_COMPANIES_1 },
    { id: 'll39', name: 'Sort LL', topic: 'Linked List', difficulty: 'Medium', leetcodeNumber: 148, companies: DUMMY_COMPANIES_2 },
    { id: 'll40', name: 'Clone a LL with random and next pointer', topic: 'Linked List', difficulty: 'Medium', leetcodeNumber: 138, companies: DUMMY_COMPANIES_3 },
    { id: 'll41', name: 'Delete all occurrences of a key in DLL', topic: 'Linked List', difficulty: 'Medium', companies: DUMMY_COMPANIES_4 },
    { id: 'll42', name: 'Remove duplicated from sorted DLL', topic: 'Linked List', difficulty: 'Easy', companies: DUMMY_COMPANIES_5 },
    { id: 'bit1', name: 'Minimum Bit Flips to Convert Number', topic: 'Bit Manipulation', difficulty: 'Easy', leetcodeNumber: 2220, companies: DUMMY_COMPANIES_1 },
    { id: 'bit2', name: 'Single Number - I', topic: 'Bit Manipulation', difficulty: 'Easy', leetcodeNumber: 136, companies: DUMMY_COMPANIES_2 },
    { id: 'bit3', name: 'Single Number - II', topic: 'Bit Manipulation', difficulty: 'Medium', leetcodeNumber: 137, companies: DUMMY_COMPANIES_3 },
    { id: 'bit4', name: 'Single Number - III', topic: 'Bit Manipulation', difficulty: 'Medium', leetcodeNumber: 260, companies: DUMMY_COMPANIES_4 },
    { id: 'bit5', name: 'Divide two numbers without multiplication and division', topic: 'Bit Manipulation', difficulty: 'Medium', leetcodeNumber: 29, companies: DUMMY_COMPANIES_5 },
    { id: 'bit6', name: 'Power Set Bit Manipulation', topic: 'Bit Manipulation', difficulty: 'Medium', leetcodeNumber: 78, companies: DUMMY_COMPANIES_1 },
    { id: 'bit7', name: 'XOR of numbers in a given range', topic: 'Bit Manipulation', difficulty: 'Medium', companies: DUMMY_COMPANIES_2 },
    { id: 'greedy1', name: 'Assign Cookies', topic: 'Greedy Algorithm', difficulty: 'Easy', leetcodeNumber: 455, companies: DUMMY_COMPANIES_3 },
    { id: 'greedy2', name: 'Lemonade Change', topic: 'Greedy Algorithm', difficulty: 'Easy', leetcodeNumber: 860, companies: DUMMY_COMPANIES_4 },
    { id: 'greedy3', name: 'Jump Game - I', topic: 'Greedy Algorithm', difficulty: 'Medium', leetcodeNumber: 55, companies: DUMMY_COMPANIES_5 },
    { id: 'greedy4', name: 'Shortest Job First', topic: 'Greedy Algorithm', difficulty: 'Medium', companies: DUMMY_COMPANIES_1 },
    { id: 'greedy5', name: 'Job sequencing Problem', topic: 'Greedy Algorithm', difficulty: 'Medium', companies: DUMMY_COMPANIES_2 },
    { id: 'greedy6', name: 'N meetings in one room', topic: 'Greedy Algorithm', difficulty: 'Easy', companies: DUMMY_COMPANIES_3 },
    { id: 'greedy7', name: 'Non-overlapping Intervals', topic: 'Greedy Algorithm', difficulty: 'Medium', leetcodeNumber: 435, companies: DUMMY_COMPANIES_4 },
    { id: 'greedy8', name: 'Insert Interval', topic: 'Greedy Algorithm', difficulty: 'Medium', leetcodeNumber: 57, companies: DUMMY_COMPANIES_5 },
    { id: 'greedy9', name: 'Minimum number of platforms required for a railway', topic: 'Greedy Algorithm', difficulty: 'Medium', companies: DUMMY_COMPANIES_1 },
    { id: 'greedy10', name: 'Valid Paranthesis Checker', topic: 'Greedy Algorithm', difficulty: 'Easy', companies: DUMMY_COMPANIES_2 },
    { id: 'greedy11', name: 'Candy', topic: 'Greedy Algorithm', difficulty: 'Hard', leetcodeNumber: 135, companies: DUMMY_COMPANIES_3 },
    { id: 'sw1', name: 'Maximum Points You Can Obtain from Cards', topic: 'Sliding Window', difficulty: 'Medium', leetcodeNumber: 1423, companies: DUMMY_COMPANIES_4 },
    { id: 'sw2', name: 'Longest Substring Without Repeating Characters', topic: 'Sliding Window', difficulty: 'Medium', leetcodeNumber: 3, companies: DUMMY_COMPANIES_5 },
    { id: 'sw3', name: 'Max Consecutive Ones III', topic: 'Sliding Window', difficulty: 'Medium', leetcodeNumber: 1004, companies: DUMMY_COMPANIES_1 },
    { id: 'sw4', name: 'Fruit Into Baskets', topic: 'Sliding Window', difficulty: 'Medium', leetcodeNumber: 904, companies: DUMMY_COMPANIES_2 },
    { id: 'sw5', name: 'Longest Substring With At Most K Distinct Characters', topic: 'Sliding Window', difficulty: 'Medium', leetcodeNumber: 340, companies: DUMMY_COMPANIES_3 },
    { id: 'sw6', name: 'Longest Repeating Character Replacement', topic: 'Sliding Window', difficulty: 'Medium', leetcodeNumber: 424, companies: DUMMY_COMPANIES_4 },
    { id: 'sw7', name: 'Minimum Window Substring', topic: 'Sliding Window', difficulty: 'Hard', leetcodeNumber: 76, companies: DUMMY_COMPANIES_5 },
    { id: 'sw8', name: 'Number of Substrings Containing All Three Characters', topic: 'Sliding Window', difficulty: 'Medium', leetcodeNumber: 1358, companies: DUMMY_COMPANIES_1 },
    { id: 'sw9', name: 'Binary Subarrays With Sum', topic: 'Sliding Window', difficulty: 'Medium', leetcodeNumber: 930, companies: DUMMY_COMPANIES_2 },
    { id: 'sw10', name: 'Count number of Nice subarrays', topic: 'Sliding Window', difficulty: 'Medium', leetcodeNumber: 1248, companies: DUMMY_COMPANIES_3 },
    { id: 'stq1', name: 'Implement Stack using Arrays', topic: 'Stack / Queues', difficulty: 'Easy', companies: DUMMY_COMPANIES_4 },
    { id: 'stq2', name: 'Implement Queue using Arrays', topic: 'Stack / Queues', difficulty: 'Easy', companies: DUMMY_COMPANIES_5 },
    { id: 'stq3', name: 'Implement Stack using Queue', topic: 'Stack / Queues', difficulty: 'Easy', leetcodeNumber: 225, companies: DUMMY_COMPANIES_1 },
    { id: 'stq4', name: 'Implement Queue using Stack', topic: 'Stack / Queues', difficulty: 'Easy', leetcodeNumber: 232, companies: DUMMY_COMPANIES_2 },
    { id: 'stq5', name: 'Implement stack using LinkedList', topic: 'Stack / Queues', difficulty: 'Easy', companies: DUMMY_COMPANIES_3 },
    { id: 'stq6', name: 'Implement queue using LinkedList', topic: 'Stack / Queues', difficulty: 'Easy', companies: DUMMY_COMPANIES_4 },
    { id: 'stq7', name: 'Balanced Paranthesis', topic: 'Stack / Queues', difficulty: 'Easy', leetcodeNumber: 20, companies: DUMMY_COMPANIES_5 },
    { id: 'stq8', name: 'Next Greater Element', topic: 'Stack / Queues', difficulty: 'Easy', leetcodeNumber: 496, companies: DUMMY_COMPANIES_1 },
    { id: 'stq9', name: 'Next Greater Element - 2', topic: 'Stack / Queues', difficulty: 'Medium', leetcodeNumber: 503, companies: DUMMY_COMPANIES_2 },
    { id: 'stq10', name: 'Asteroid Collision', topic: 'Stack / Queues', difficulty: 'Medium', leetcodeNumber: 735, companies: DUMMY_COMPANIES_3 },
    { id: 'stq11', name: 'Sum of Subarray Minimums', topic: 'Stack / Queues', difficulty: 'Medium', leetcodeNumber: 907, companies: DUMMY_COMPANIES_4 },
    { id: 'stq12', name: 'Sum of Subarray Ranges', topic: 'Stack / Queues', difficulty: 'Medium', leetcodeNumber: 2104, companies: DUMMY_COMPANIES_5 },
    { id: 'stq13', name: 'Remove K Digits', topic: 'Stack / Queues', difficulty: 'Medium', leetcodeNumber: 402, companies: DUMMY_COMPANIES_1 },
    { id: 'stq14', name: 'Implement Min Stack', topic: 'Stack / Queues', difficulty: 'Easy', leetcodeNumber: 155, companies: DUMMY_COMPANIES_2 },
    { id: 'stq15', name: 'Sliding Window Maximum', topic: 'Stack / Queues', difficulty: 'Hard', leetcodeNumber: 239, companies: DUMMY_COMPANIES_3 },
    { id: 'stq16', name: 'Trapping Rainwater', topic: 'Stack / Queues', difficulty: 'Hard', leetcodeNumber: 42, companies: DUMMY_COMPANIES_4 },
    { id: 'stq17', name: 'Largest rectangle in a histogram', topic: 'Stack / Queues', difficulty: 'Hard', leetcodeNumber: 84, companies: DUMMY_COMPANIES_5 },
    { id: 'stq18', name: 'Maximum Rectangles', topic: 'Stack / Queues', difficulty: 'Hard', leetcodeNumber: 85, companies: DUMMY_COMPANIES_1 },
    { id: 'stq19', name: 'Stock span problem', topic: 'Stack / Queues', difficulty: 'Medium', leetcodeNumber: 901, companies: DUMMY_COMPANIES_2 },
    { id: 'stq20', name: 'Celebrity Problem', topic: 'Stack / Queues', difficulty: 'Medium', companies: DUMMY_COMPANIES_3 },
    { id: 'stq21', name: 'LRU Cache', topic: 'Stack / Queues', difficulty: 'Medium', leetcodeNumber: 146, companies: DUMMY_COMPANIES_4 },
    { id: 'stq22', name: 'LFU Cache', topic: 'Stack / Queues', difficulty: 'Hard', leetcodeNumber: 460, companies: DUMMY_COMPANIES_5 },
    { id: 'bt1', name: 'Inorder Traversal', topic: 'Binary Tree', difficulty: 'Easy', leetcodeNumber: 94, companies: DUMMY_COMPANIES_1 },
    { id: 'bt2', name: 'Preorder Traversal', topic: 'Binary Tree', difficulty: 'Easy', leetcodeNumber: 144, companies: DUMMY_COMPANIES_2 },
    { id: 'bt3', name: 'Postorder Traversal', topic: 'Binary Tree', difficulty: 'Easy', leetcodeNumber: 145, companies: DUMMY_COMPANIES_3 },
    { id: 'bt4', name: 'Level Order Traversal', topic: 'Binary Tree', difficulty: 'Medium', leetcodeNumber: 102, companies: DUMMY_COMPANIES_4 },
    { id: 'bt5', name: 'Pre, Post, Inorder in one traversal', topic: 'Binary Tree', difficulty: 'Medium', companies: DUMMY_COMPANIES_5 },
    { id: 'bt6', name: 'Maximum Depth in BT', topic: 'Binary Tree', difficulty: 'Easy', leetcodeNumber: 104, companies: DUMMY_COMPANIES_1 },
    { id: 'bt7', name: 'Check if two trees are identical or not', topic: 'Binary Tree', difficulty: 'Easy', leetcodeNumber: 100, companies: DUMMY_COMPANIES_2 },
    { id: 'bt8', name: 'Check for balanced binary tree', topic: 'Binary Tree', difficulty: 'Easy', leetcodeNumber: 110, companies: DUMMY_COMPANIES_3 },
    { id: 'bt9', name: 'Diameter of Binary Tree', topic: 'Binary Tree', difficulty: 'Easy', leetcodeNumber: 543, companies: DUMMY_COMPANIES_4 },
    { id: 'bt10', name: 'Maximum path sum', topic: 'Binary Tree', difficulty: 'Hard', leetcodeNumber: 124, companies: DUMMY_COMPANIES_5 },
    { id: 'bt11', name: 'Check for symmetrical BTs', topic: 'Binary Tree', difficulty: 'Easy', leetcodeNumber: 101, companies: DUMMY_COMPANIES_1 },
    { id: 'bt12', name: 'Zig Zag or Spiral Traversal', topic: 'Binary Tree', difficulty: 'Medium', leetcodeNumber: 103, companies: DUMMY_COMPANIES_2 },
    { id: 'bt13', name: 'Boundary Traversal', topic: 'Binary Tree', difficulty: 'Hard', companies: DUMMY_COMPANIES_3 },
    { id: 'bt14', name: 'Vertical Order Traversal', topic: 'Binary Tree', difficulty: 'Hard', leetcodeNumber: 987, companies: DUMMY_COMPANIES_4 },
    { id: 'bt15', name: 'Top View of BT', topic: 'Binary Tree', difficulty: 'Medium', companies: DUMMY_COMPANIES_5 },
    { id: 'bt16', name: 'Bottom view of BT', topic: 'Binary Tree', difficulty: 'Medium', companies: DUMMY_COMPANIES_1 },
    { id: 'bt17', name: 'Right/Left View of BT', topic: 'Binary Tree', difficulty: 'Medium', leetcodeNumber: 199, companies: DUMMY_COMPANIES_2 },
    { id: 'bt18', name: 'Print root to node path in BT', topic: 'Binary Tree', difficulty: 'Medium', companies: DUMMY_COMPANIES_3 },
    { id: 'bt19', name: 'LCA in BT', topic: 'Binary Tree', difficulty: 'Medium', leetcodeNumber: 236, companies: DUMMY_COMPANIES_4 },
    { id: 'bt20', name: 'Maximum Width of BT', topic: 'Binary Tree', difficulty: 'Medium', leetcodeNumber: 662, companies: DUMMY_COMPANIES_5 },
    { id: 'bt21', name: 'Print all nodes at a distance of K in BT', topic: 'Binary Tree', difficulty: 'Medium', leetcodeNumber: 863, companies: DUMMY_COMPANIES_1 },
    { id: 'bt22', name: 'Minimum time taken to burn the BT from a given Node', topic: 'Binary Tree', difficulty: 'Hard', leetcodeNumber: 2385, companies: DUMMY_COMPANIES_2 },
    { id: 'bt23', name: 'Count total nodes in a complete BT', topic: 'Binary Tree', difficulty: 'Medium', leetcodeNumber: 222, companies: DUMMY_COMPANIES_3 },
    { id: 'bt24', name: 'Requirements needed to construct a unique BT', topic: 'Binary Tree', difficulty: 'Medium', companies: DUMMY_COMPANIES_4 },
    { id: 'bt25', name: 'Construct a BT from Preorder and Inorder', topic: 'Binary Tree', difficulty: 'Medium', leetcodeNumber: 105, companies: DUMMY_COMPANIES_5 },
    { id: 'bt26', name: 'Construct a BT from Postorder and Inorder', topic: 'Binary Tree', difficulty: 'Medium', leetcodeNumber: 106, companies: DUMMY_COMPANIES_1 },
    { id: 'bt27', name: 'Serialize and De-serialize BT', topic: 'Binary Tree', difficulty: 'Hard', leetcodeNumber: 297, companies: DUMMY_COMPANIES_2 },
    { id: 'bt28', name: 'Morris Inorder Traversal', topic: 'Binary Tree', difficulty: 'Medium', companies: DUMMY_COMPANIES_3 },
    { id: 'bt29', name: 'Morris Preorder Traversal', topic: 'Binary Tree', difficulty: 'Medium', companies: DUMMY_COMPANIES_4 },
    { id: 'bst1', name: 'Search in BST', topic: 'Binary Search Tree', difficulty: 'Easy', leetcodeNumber: 700, companies: DUMMY_COMPANIES_5 },
    { id: 'bst2', name: 'Floor and Ceil in a BST', topic: 'Binary Search Tree', difficulty: 'Medium', companies: DUMMY_COMPANIES_1 },
    { id: 'bst3', name: 'Insert a given node in BST', topic: 'Binary Search Tree', difficulty: 'Medium', leetcodeNumber: 701, companies: DUMMY_COMPANIES_2 },
    { id: 'bst4', name: 'Delete a node in BST', topic: 'Binary Search Tree', difficulty: 'Medium', leetcodeNumber: 450, companies: DUMMY_COMPANIES_3 },
    { id: 'bst5', name: 'Kth Smallest and Largest element in BST', topic: 'Binary Search Tree', difficulty: 'Medium', leetcodeNumber: 230, companies: DUMMY_COMPANIES_4 },
    { id: 'bst6', name: 'Check if a tree is a BST or not', topic: 'Binary Search Tree', difficulty: 'Medium', leetcodeNumber: 98, companies: DUMMY_COMPANIES_5 },
    { id: 'bst7', name: 'LCA in BST', topic: 'Binary Search Tree', difficulty: 'Easy', leetcodeNumber: 235, companies: DUMMY_COMPANIES_1 },
    { id: 'bst8', name: 'Construct a BST from a preorder traversal', topic: 'Binary Search Tree', difficulty: 'Medium', leetcodeNumber: 1008, companies: DUMMY_COMPANIES_2 },
    { id: 'bst9', name: 'Inorder successor and predecessor in BST', topic: 'Binary Search Tree', difficulty: 'Medium', leetcodeNumber: 285, companies: DUMMY_COMPANIES_3 },
    { id: 'bst10', name: 'BST iterator', topic: 'Binary Search Tree', difficulty: 'Medium', leetcodeNumber: 173, companies: DUMMY_COMPANIES_4 },
    { id: 'bst11', name: 'Two sum in BST', topic: 'Binary Search Tree', difficulty: 'Easy', leetcodeNumber: 653, companies: DUMMY_COMPANIES_5 },
    { id: 'bst12', name: 'Correct BST with two nodes swapped', topic: 'Binary Search Tree', difficulty: 'Medium', leetcodeNumber: 99, companies: DUMMY_COMPANIES_1 },
    { id: 'bst13', name: 'Largest BST in Binary Tree', topic: 'Binary Search Tree', difficulty: 'Hard', leetcodeNumber: 333, companies: DUMMY_COMPANIES_2 },
    { id: 'heap1', name: 'Heapify Algorithm', topic: 'Heaps', difficulty: 'Medium', companies: DUMMY_COMPANIES_3 },
    { id: 'heap2', name: 'Build heap from a given Array', topic: 'Heaps', difficulty: 'Medium', companies: DUMMY_COMPANIES_4 },
    { id: 'heap3', name: 'Implement Min Heap', topic: 'Heaps', difficulty: 'Easy', companies: DUMMY_COMPANIES_5 },
    { id: 'heap4', name: 'Implement Max Heap', topic: 'Heaps', difficulty: 'Easy', companies: DUMMY_COMPANIES_1 },
    { id: 'heap5', name: 'Check if an array represents a min heap', topic: 'Heaps', difficulty: 'Easy', companies: DUMMY_COMPANIES_2 },
    { id: 'heap6', name: 'Convert Min Heap to Max Heap', topic: 'Heaps', difficulty: 'Medium', companies: DUMMY_COMPANIES_3 },
    { id: 'heap7', name: 'Heap Sort', topic: 'Heaps', difficulty: 'Medium', companies: DUMMY_COMPANIES_4 },
    { id: 'heap8', name: 'K-th Largest element in an array', topic: 'Heaps', difficulty: 'Medium', leetcodeNumber: 215, companies: DUMMY_COMPANIES_5 },
    { id: 'heap9', name: 'Kth largest element in a stream of running integers', topic: 'Heaps', difficulty: 'Easy', leetcodeNumber: 703, companies: DUMMY_COMPANIES_1 },
    { id: 'graph1', name: 'Connected Components', topic: 'Graphs', difficulty: 'Medium', companies: DUMMY_COMPANIES_2 },
    { id: 'graph2', name: 'Traversal Techniques', topic: 'Graphs', difficulty: 'Easy', companies: DUMMY_COMPANIES_3 },
    { id: 'graph3', name: 'Number of provinces', topic: 'Graphs', difficulty: 'Medium', leetcodeNumber: 547, companies: DUMMY_COMPANIES_4 },
    { id: 'graph4', name: 'Number of islands', topic: 'Graphs', difficulty: 'Medium', leetcodeNumber: 200, companies: DUMMY_COMPANIES_5 },
    { id: 'graph5', name: 'Flood fill algorithm', topic: 'Graphs', difficulty: 'Easy', leetcodeNumber: 733, companies: DUMMY_COMPANIES_1 },
    { id: 'graph6', name: 'Number of enclaves', topic: 'Graphs', difficulty: 'Medium', leetcodeNumber: 1020, companies: DUMMY_COMPANIES_2 },
    { id: 'graph7', name: 'Rotten Oranges', topic: 'Graphs', difficulty: 'Medium', leetcodeNumber: 994, companies: DUMMY_COMPANIES_3 },
    { id: 'graph8', name: 'Distance of nearest cell having one', topic: 'Graphs', difficulty: 'Medium', leetcodeNumber: 542, companies: DUMMY_COMPANIES_4 },
    { id: 'graph9', name: 'Surrounded Regions', topic: 'Graphs', difficulty: 'Medium', leetcodeNumber: 130, companies: DUMMY_COMPANIES_5 },
    { id: 'graph10', name: 'Number of distinct islands', topic: 'Graphs', difficulty: 'Medium', leetcodeNumber: 694, companies: DUMMY_COMPANIES_1 },
    { id: 'graph11', name: 'Detect a cycle in an undirected graph', topic: 'Graphs', difficulty: 'Medium', companies: DUMMY_COMPANIES_2 },
    { id: 'graph12', name: 'Bipartite graph', topic: 'Graphs', difficulty: 'Medium', leetcodeNumber: 785, companies: DUMMY_COMPANIES_3 },
    { id: 'graph13', name: "Topological sort or Kahn's algorithm", topic: 'Graphs', difficulty: 'Medium', leetcodeNumber: 210, companies: DUMMY_COMPANIES_4 },
    { id: 'graph14', name: 'Detect a cycle in a directed graph', topic: 'Graphs', difficulty: 'Medium', leetcodeNumber: 207, companies: DUMMY_COMPANIES_5 },
    { id: 'graph15', name: 'Find eventual safe states', topic: 'Graphs', difficulty: 'Medium', leetcodeNumber: 802, companies: DUMMY_COMPANIES_1 },
    { id: 'graph16', name: 'Course Schedule I', topic: 'Graphs', difficulty: 'Medium', leetcodeNumber: 207, companies: DUMMY_COMPANIES_2 },
    { id: 'graph17', name: 'Course Schedule II', topic: 'Graphs', difficulty: 'Medium', leetcodeNumber: 210, companies: DUMMY_COMPANIES_3 },
    { id: 'graph18', name: 'Alien Dictionary', topic: 'Graphs', difficulty: 'Hard', leetcodeNumber: 269, companies: DUMMY_COMPANIES_4 },
    { id: 'graph19', name: 'Shortest path in DAG', topic: 'Graphs', difficulty: 'Medium', companies: DUMMY_COMPANIES_5 },
    { id: 'graph20', name: 'Shortest path in undirected graph with unit weights', topic: 'Graphs', difficulty: 'Medium', companies: DUMMY_COMPANIES_1 },
    { id: 'graph21', name: 'Word ladder I', topic: 'Graphs', difficulty: 'Hard', leetcodeNumber: 127, companies: DUMMY_COMPANIES_2 },
    { id: 'graph22', name: 'Word ladder II', topic: 'Graphs', difficulty: 'Hard', leetcodeNumber: 126, companies: DUMMY_COMPANIES_3 },
    { id: 'graph23', name: "Dijkstra's algorithm", topic: 'Graphs', difficulty: 'Hard', companies: DUMMY_COMPANIES_4 },
    { id: 'graph24', name: 'Print Shortest Path', topic: 'Graphs', difficulty: 'Hard', companies: DUMMY_COMPANIES_5 },
    { id: 'graph25', name: 'Shortest Distance in a Binary Maze', topic: 'Graphs', difficulty: 'Medium', leetcodeNumber: 1091, companies: DUMMY_COMPANIES_1 },
    { id: 'graph26', name: 'Path with minimum effort', topic: 'Graphs', difficulty: 'Medium', leetcodeNumber: 1631, companies: DUMMY_COMPANIES_2 },
    { id: 'graph27', name: 'Cheapest flight within K stops', topic: 'Graphs', difficulty: 'Medium', leetcodeNumber: 787, companies: DUMMY_COMPANIES_3 },
    { id: 'graph28', name: 'Minimum multiplications to reach end', topic: 'Graphs', difficulty: 'Medium', leetcodeNumber: 1928, companies: DUMMY_COMPANIES_4 },
    { id: 'graph29', name: 'Number of ways to arrive at destination', topic: 'Graphs', difficulty: 'Medium', leetcodeNumber: 1976, companies: DUMMY_COMPANIES_5 },
    { id: 'graph30', name: 'Bellman ford algorithm', topic: 'Graphs', difficulty: 'Medium', companies: DUMMY_COMPANIES_1 },
    { id: 'graph31', name: 'Floyd warshall algorithm', topic: 'Graphs', difficulty: 'Medium', companies: DUMMY_COMPANIES_2 },
    { id: 'graph32', name: 'Find the city with the smallest number of neighbors', topic: 'Graphs', difficulty: 'Medium', leetcodeNumber: 1334, companies: DUMMY_COMPANIES_3 },
    { id: 'graph33', name: 'Disjoint Set', topic: 'Graphs', difficulty: 'Medium', companies: DUMMY_COMPANIES_4 },
    { id: 'graph34', name: 'Find the MST weight', topic: 'Graphs', difficulty: 'Hard', leetcodeNumber: 1584, companies: DUMMY_COMPANIES_5 },
    { id: 'graph35', name: 'Number of operations to make network connected', topic: 'Graphs', difficulty: 'Medium', leetcodeNumber: 1319, companies: DUMMY_COMPANIES_1 },
    { id: 'graph36', name: 'Accounts merge', topic: 'Graphs', difficulty: 'Medium', leetcodeNumber: 721, companies: DUMMY_COMPANIES_2 },
    { id: 'graph37', name: 'Number of islands II', topic: 'Graphs', difficulty: 'Hard', leetcodeNumber: 305, companies: DUMMY_COMPANIES_3 },
    { id: 'graph38', name: 'Making a large island', topic: 'Graphs', difficulty: 'Hard', leetcodeNumber: 827, companies: DUMMY_COMPANIES_4 },
    { id: 'graph39', name: 'Most stones removed with same row or column', topic: 'Graphs', difficulty: 'Medium', leetcodeNumber: 947, companies: DUMMY_COMPANIES_5 },
    { id: 'graph40', name: "Kosaraju's algorithm", topic: 'Graphs', difficulty: 'Hard', companies: DUMMY_COMPANIES_1 },
    { id: 'graph41', name: 'Bridges in graph', topic: 'Graphs', difficulty: 'Hard', leetcodeNumber: 1192, companies: DUMMY_COMPANIES_2 },
    { id: 'graph42', name: 'Articulation point in graph', topic: 'Graphs', difficulty: 'Hard', companies: DUMMY_COMPANIES_3 },
    { id: 'dp1', name: 'Climbing stairs', topic: 'Dynamic Programming', difficulty: 'Easy', leetcodeNumber: 70, companies: DUMMY_COMPANIES_4 },
    { id: 'dp2', name: 'Frog Jump', topic: 'Dynamic Programming', difficulty: 'Medium', leetcodeNumber: 403, companies: DUMMY_COMPANIES_5 },
    { id: 'dp3', name: 'Frog jump with K distances', topic: 'Dynamic Programming', difficulty: 'Medium', companies: DUMMY_COMPANIES_1 },
    { id: 'dp4', name: 'Maximum sum of non adjacent elements', topic: 'Dynamic Programming', difficulty: 'Medium', leetcodeNumber: 198, companies: DUMMY_COMPANIES_2 },
    { id: 'dp5', name: 'House robber', topic: 'Dynamic Programming', difficulty: 'Medium', leetcodeNumber: 198, companies: DUMMY_COMPANIES_3 },
    { id: 'dp6', name: "Ninja's training", topic: 'Dynamic Programming', difficulty: 'Medium', companies: DUMMY_COMPANIES_4 },
    { id: 'dp7', name: 'Grid unique paths', topic: 'Dynamic Programming', difficulty: 'Medium', leetcodeNumber: 62, companies: DUMMY_COMPANIES_5 },
    { id: 'dp8', name: 'Unique paths II', topic: 'Dynamic Programming', difficulty: 'Medium', leetcodeNumber: 63, companies: DUMMY_COMPANIES_1 },
    { id: 'dp9', name: 'Minimum Falling Path Sum', topic: 'Dynamic Programming', difficulty: 'Medium', leetcodeNumber: 931, companies: DUMMY_COMPANIES_2 },
    { id: 'dp10', name: 'Triangle', topic: 'Dynamic Programming', difficulty: 'Medium', leetcodeNumber: 120, companies: DUMMY_COMPANIES_3 },
    { id: 'dp11', name: 'Cherry pickup II', topic: 'Dynamic Programming', difficulty: 'Hard', leetcodeNumber: 1463, companies: DUMMY_COMPANIES_4 },
    { id: 'dp12', name: 'Best time to buy and sell stock', topic: 'Dynamic Programming', difficulty: 'Easy', leetcodeNumber: 121, companies: DUMMY_COMPANIES_5 },
    { id: 'dp13', name: 'Best time to buy and sell stock II', topic: 'Dynamic Programming', difficulty: 'Medium', leetcodeNumber: 122, companies: DUMMY_COMPANIES_1 },
    { id: 'dp14', name: 'Best time to buy and sell stock III', topic: 'Dynamic Programming', difficulty: 'Hard', leetcodeNumber: 123, companies: DUMMY_COMPANIES_2 },
    { id: 'dp15', name: 'Best time to buy and sell stock IV', topic: 'Dynamic Programming', difficulty: 'Hard', leetcodeNumber: 188, companies: DUMMY_COMPANIES_3 },
    { id: 'dp16', name: 'Best time to buy and sell stock with transaction fees', topic: 'Dynamic Programming', difficulty: 'Medium', leetcodeNumber: 714, companies: DUMMY_COMPANIES_4 },
    { id: 'dp17', name: 'Subset sum equals to target', topic: 'Dynamic Programming', difficulty: 'Medium', companies: DUMMY_COMPANIES_5 },
    { id: 'dp18', name: 'Partition equal subset sum', topic: 'Dynamic Programming', difficulty: 'Medium', leetcodeNumber: 416, companies: DUMMY_COMPANIES_1 },
    { id: 'dp19', name: 'Partition a set into two subsets with minimum absolute sum difference', topic: 'Dynamic Programming', difficulty: 'Hard', leetcodeNumber: 2035, companies: DUMMY_COMPANIES_2 },
    { id: 'dp20', name: 'Count subsets with sum K', topic: 'Dynamic Programming', difficulty: 'Medium', companies: DUMMY_COMPANIES_3 },
    { id: 'dp21', name: 'Count partitions with given difference', topic: 'Dynamic Programming', difficulty: 'Medium', companies: DUMMY_COMPANIES_4 },
    { id: 'dp22', name: '0 and 1 Knapsack', topic: 'Dynamic Programming', difficulty: 'Medium', companies: DUMMY_COMPANIES_5 },
    { id: 'dp23', name: 'Minimum coins', topic: 'Dynamic Programming', difficulty: 'Medium', leetcodeNumber: 322, companies: DUMMY_COMPANIES_1 },
    { id: 'dp24', name: 'Target sum', topic: 'Dynamic Programming', difficulty: 'Medium', leetcodeNumber: 494, companies: DUMMY_COMPANIES_2 },
    { id: 'dp25', name: 'Coin change II', topic: 'Dynamic Programming', difficulty: 'Medium', leetcodeNumber: 518, companies: DUMMY_COMPANIES_3 },
    { id: 'dp26', name: 'Unbounded knapsack', topic: 'Dynamic Programming', difficulty: 'Medium', companies: DUMMY_COMPANIES_4 },
    { id: 'dp27', name: 'Rod cutting problem', topic: 'Dynamic Programming', difficulty: 'Medium', companies: DUMMY_COMPANIES_5 },
    { id: 'dp28', name: 'Longest Increasing Subsequence', topic: 'Dynamic Programming', difficulty: 'Medium', leetcodeNumber: 300, companies: DUMMY_COMPANIES_1 },
    { id: 'dp29', name: 'Print Longest Increasing Subsequence', topic: 'Dynamic Programming', difficulty: 'Medium', companies: DUMMY_COMPANIES_2 },
    { id: 'dp30', name: 'Largest Divisible Subset', topic: 'Dynamic Programming', difficulty: 'Medium', leetcodeNumber: 368, companies: DUMMY_COMPANIES_3 },
    { id: 'dp31', name: 'Longest String Chain', topic: 'Dynamic Programming', difficulty: 'Medium', leetcodeNumber: 1048, companies: DUMMY_COMPANIES_4 },
    { id: 'dp32', name: 'Longest Bitonic Subsequence', topic: 'Dynamic Programming', difficulty: 'Hard', companies: DUMMY_COMPANIES_5 },
    { id: 'dp33', name: 'Number of Longest Increasing Subsequences', topic: 'Dynamic Programming', difficulty: 'Medium', leetcodeNumber: 673, companies: DUMMY_COMPANIES_1 },
    { id: 'dp34', name: 'Longest common subsequence', topic: 'Dynamic Programming', difficulty: 'Medium', leetcodeNumber: 1143, companies: DUMMY_COMPANIES_2 },
    { id: 'dp35', name: 'Longest common substring', topic: 'Dynamic Programming', difficulty: 'Medium', companies: DUMMY_COMPANIES_3 },
    { id: 'dp36', name: 'Longest palindromic subsequence', topic: 'Dynamic Programming', difficulty: 'Medium', leetcodeNumber: 516, companies: DUMMY_COMPANIES_4 },
    { id: 'dp37', name: 'Minimum insertions to make string palindrome', topic: 'Dynamic Programming', difficulty: 'Hard', leetcodeNumber: 1312, companies: DUMMY_COMPANIES_5 },
    { id: 'dp38', name: 'Minimum insertions or deletions to convert string A to B', topic: 'Dynamic Programming', difficulty: 'Medium', leetcodeNumber: 583, companies: DUMMY_COMPANIES_1 },
    { id: 'dp39', name: 'Shortest common supersequence', topic: 'Dynamic Programming', difficulty: 'Hard', leetcodeNumber: 1092, companies: DUMMY_COMPANIES_2 },
    { id: 'dp40', name: 'Distinct subsequences', topic: 'Dynamic Programming', difficulty: 'Hard', leetcodeNumber: 115, companies: DUMMY_COMPANIES_3 },
    { id: 'dp41', name: 'Edit distance', topic: 'Dynamic Programming', difficulty: 'Hard', leetcodeNumber: 72, companies: DUMMY_COMPANIES_4 },
    { id: 'dp42', name: 'Wildcard matching', topic: 'Dynamic Programming', difficulty: 'Hard', leetcodeNumber: 44, companies: DUMMY_COMPANIES_5 },
    { id: 'dp43', name: 'Matrix chain multiplication', topic: 'Dynamic Programming', difficulty: 'Hard', companies: DUMMY_COMPANIES_1 },
    { id: 'dp44', name: 'Minimum cost to cut the stick', topic: 'Dynamic Programming', difficulty: 'Hard', leetcodeNumber: 1547, companies: DUMMY_COMPANIES_2 },
    { id: 'dp45', name: 'Burst balloons', topic: 'Dynamic Programming', difficulty: 'Hard', leetcodeNumber: 312, companies: DUMMY_COMPANIES_3 },
    { id: 'dp46', name: 'Palindrome partitioning II', topic: 'Dynamic Programming', difficulty: 'Hard', leetcodeNumber: 132, companies: DUMMY_COMPANIES_4 },
    { id: 'tries1', name: 'Trie Implementation and Operations', topic: 'Tries', difficulty: 'Medium', leetcodeNumber: 208, companies: DUMMY_COMPANIES_5 },
    { id: 'tries2', name: 'Trie Implementation and Advanced Operations', topic: 'Tries', difficulty: 'Medium', companies: DUMMY_COMPANIES_1 },
    { id: 'tries3', name: 'Longest word with all prefixes', topic: 'Tries', difficulty: 'Medium', leetcodeNumber: 720, companies: DUMMY_COMPANIES_2 },
    { id: 'tries4', name: 'Number of distinct substrings in a string', topic: 'Tries', difficulty: 'Hard', companies: DUMMY_COMPANIES_3 },
    { id: 'tries5', name: 'Maximum XOR of two numbers in an array', topic: 'Tries', difficulty: 'Medium', leetcodeNumber: 421, companies: DUMMY_COMPANIES_4 },
    { id: 'tries6', name: 'Maximum Xor with an element from an array', topic: 'Tries', difficulty: 'Hard', leetcodeNumber: 1707, companies: DUMMY_COMPANIES_5 },
    { id: 'stradv1', name: 'Reverse every word in a string', topic: 'Strings(Advanced)', difficulty: 'Medium', leetcodeNumber: 151, companies: DUMMY_COMPANIES_1 },
    { id: 'stradv2', name: 'Minimum number of bracket reversals to make an expression balanced', topic: 'Strings(Advanced)', difficulty: 'Medium', companies: DUMMY_COMPANIES_2 },
    { id: 'stradv3', name: 'Count and say', topic: 'Strings(Advanced)', difficulty: 'Medium', leetcodeNumber: 38, companies: DUMMY_COMPANIES_3 },
    { id: 'stradv4', name: 'Rabin Karp Algorithm', topic: 'Strings(Advanced)', difficulty: 'Hard', companies: DUMMY_COMPANIES_4 },
    { id: 'stradv5', name: 'Z function', topic: 'Strings(Advanced)', difficulty: 'Hard', companies: DUMMY_COMPANIES_5 },
    { id: 'stradv6', name: 'KMP Algorithm or LPS array', topic: 'Strings(Advanced)', difficulty: 'Hard', leetcodeNumber: 28, companies: DUMMY_COMPANIES_1 },
    { id: 'stradv7', name: 'Shortest Palindrome', topic: 'Strings(Advanced)', difficulty: 'Hard', leetcodeNumber: 214, companies: DUMMY_COMPANIES_2 },
    { id: 'stradv8', name: 'Longest happy prefix', topic: 'Strings(Advanced)', difficulty: 'Hard', leetcodeNumber: 1392, companies: DUMMY_COMPANIES_3 },
    { id: 'math1', name: 'Sieve of Eratosthenes algorithm', topic: 'Maths', difficulty: 'Medium', companies: DUMMY_COMPANIES_4 },
    { id: 'math2', name: 'Print all primes till N', topic: 'Maths', difficulty: 'Medium', leetcodeNumber: 204, companies: DUMMY_COMPANIES_5 },
    { id: 'math3', name: 'Prime factorisation of a Number', topic: 'Maths', difficulty: 'Medium', companies: DUMMY_COMPANIES_1 },
    { id: 'math4', name: 'Count primes in range L to R', topic: 'Maths', difficulty: 'Medium', companies: DUMMY_COMPANIES_2 }
];

const initialTopics = Array.from(new Set(problemsData.map(p => p.topic))).sort();

// --- HELPER COMPONENTS ---
const CompanyLogo = ({ company, size = 'sm' }: { company: string, size?: 'sm' | 'md' | 'lg' }) => {
  const domain = COMPANY_DOMAINS[company];
  const [imageError, setImageError] = useState(false);
  const sizeClasses = { sm: 'w-6 h-6', md: 'w-8 h-8', lg: 'w-10 h-10' };
  if (!domain || imageError) {
    return (
      <div className={`${sizeClasses[size]} bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold ring-2 ring-white`}>
        {company.charAt(0)}
      </div>
    );
  }
  return (
    <img
      src={`https://logo.clearbit.com/${domain}`}
      alt={`${company} logo`}
      className={`${sizeClasses[size]} rounded-full object-contain bg-white shadow-sm ring-2 ring-white`}
      onError={() => setImageError(true)}
    />
  );
};

const CompanyTooltip: React.FC<CompanyTooltipProps> = ({ companies, visibleCount }) => {
  const visibleCompanies = companies.slice(0, visibleCount);
  const hiddenCompanies = companies.slice(visibleCount);

  return (
    <div className="flex items-center gap-1">
      {visibleCompanies.map((company, index) => (
        <CompanyLogo key={index} company={company} size="sm" />
      ))}
      {hiddenCompanies.length > 0 && (
        <div className="group relative">
          <span className="relative z-10 inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-gray-700 text-white cursor-pointer hover:bg-gray-800 transition-all duration-200 shadow-lg ring-2 ring-white">
            +{hiddenCompanies.length}
          </span>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 px-6 py-4 bg-gradient-to-br from-gray-800 to-gray-900 text-white text-sm rounded-2xl shadow-2xl opacity-0 scale-95 translate-y-[-10px] group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out pointer-events-none whitespace-nowrap z-50 min-w-[320px] border border-blue-500/50">
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-gray-800"></div>
            <div className="font-bold mb-3 text-blue-300 text-center text-base">
              🏢 Additional Companies ({hiddenCompanies.length})
            </div>
            <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-2">
              {hiddenCompanies.map((company, idx) => (
                <div key={idx} className="flex items-center gap-3 py-2 px-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                  <CompanyLogo company={company} size="sm" />
                  <span className="text-white font-medium text-sm">{company}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


// --- MAIN APP COMPONENT ---
function App() {
  const [problems, setProblems] = useState<Problem[]>(() =>
    problemsData.map(p => ({ ...p, completed: false, starred: false }))
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [showCompleted, setShowCompleted] = useState('all');
  const [showStarred, setShowStarred] = useState(false);
  const [viewMode, setViewMode] = useState('grouped');
  const [expandedTopics, setExpandedTopics] = useState(new Set(initialTopics));

  useEffect(() => {
    let problemsWithProgress = problemsData.map(p => ({ ...p, completed: false, starred: false }));
    try {
      const savedCompleted = localStorage.getItem('leetcode-progress');
      if (savedCompleted) {
        const completedIds: string[] = JSON.parse(savedCompleted);
        if (Array.isArray(completedIds)) {
          problemsWithProgress = problemsWithProgress.map(p => ({ ...p, completed: completedIds.includes(p.id) }));
        }
      }
      const savedStarred = localStorage.getItem('leetcode-starred');
      if (savedStarred) {
        const starredIds: string[] = JSON.parse(savedStarred);
        if (Array.isArray(starredIds)) {
          problemsWithProgress = problemsWithProgress.map(p => ({ ...p, starred: starredIds.includes(p.id) }));
        }
      }
    } catch (error) {
      console.error("Failed to load progress from localStorage", error);
      localStorage.removeItem('leetcode-progress');
      localStorage.removeItem('leetcode-starred');
    }
    setProblems(problemsWithProgress);
  }, []);

  const saveProgress = (updatedProblems: Problem[]) => {
    const completedIds = updatedProblems.filter(p => p.completed).map(p => p.id);
    localStorage.setItem('leetcode-progress', JSON.stringify(completedIds));
  };

  const saveStarred = (updatedProblems: Problem[]) => {
    const starredIds = updatedProblems.filter(p => p.starred).map(p => p.id);
    localStorage.setItem('leetcode-starred', JSON.stringify(starredIds));
  };

  const toggleProblem = (id: string) => {
    const updated = problems.map(p => (p.id === id ? { ...p, completed: !p.completed } : p));
    setProblems(updated);
    saveProgress(updated);
  };

  const toggleStarred = (id: string) => {
    const updated = problems.map(p => (p.id === id ? { ...p, starred: !p.starred } : p));
    setProblems(updated);
    saveStarred(updated);
  };

  const allTopics = useMemo(() => {
    const topics = new Set(problems.map(p => p.topic));
    return Array.from(topics).sort();
  }, [problems]);

  const filteredProblems = useMemo(() => {
    return problems.filter(problem => {
      const matchesSearch = problem.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDifficulty = selectedDifficulty === 'all' || problem.difficulty === selectedDifficulty;
      const matchesCompany = selectedCompany === 'all' || problem.companies.includes(selectedCompany);
      const matchesTopic = selectedTopic === 'all' || problem.topic === selectedTopic;
      const matchesCompleted = showCompleted === 'all' || (showCompleted === 'completed' && problem.completed) || (showCompleted === 'pending' && !problem.completed);
      const matchesStarred = !showStarred || problem.starred;
      return matchesSearch && matchesDifficulty && matchesCompany && matchesTopic && matchesCompleted && matchesStarred;
    });
  }, [problems, searchTerm, selectedDifficulty, selectedCompany, selectedTopic, showCompleted, showStarred]);

  const groupedProblems = useMemo(() => {
    const grouped: Record<string, Problem[]> = {};
    filteredProblems.forEach(problem => {
      if (!grouped[problem.topic]) {
        grouped[problem.topic] = [];
      }
      grouped[problem.topic].push(problem);
    });
    const orderedGroupedProblems: Record<string, Problem[]> = {};
    initialTopics.forEach(topic => {
        if (grouped[topic]) {
            orderedGroupedProblems[topic] = grouped[topic];
        }
    });
    return orderedGroupedProblems;
  }, [filteredProblems]);

  const stats = useMemo(() => {
    const total = problems.length;
    const completed = problems.filter(p => p.completed).length;
    const easy = problems.filter(p => p.difficulty === 'Easy').length;
    const medium = problems.filter(p => p.difficulty === 'Medium').length;
    const hard = problems.filter(p => p.difficulty === 'Hard').length;
    const completedEasy = problems.filter(p => p.difficulty === 'Easy' && p.completed).length;
    const completedMedium = problems.filter(p => p.difficulty === 'Medium' && p.completed).length;
    const completedHard = problems.filter(p => p.difficulty === 'Hard' && p.completed).length;
    return {
      total, completed, percentage: total > 0 ? Math.round((completed / total) * 100) : 0, easy: { total: easy, completed: completedEasy }, medium: { total: medium, completed: completedMedium }, hard: { total: hard, completed: completedHard }
    };
  }, [problems]);

  const allCompanies = useMemo(() => {
    const companies = new Set<string>();
    problems.forEach(problem => { problem.companies.forEach(company => companies.add(company)); });
    return Array.from(companies).sort();
  }, [problems]);

  const toggleTopic = (topic: string) => {
    const newExpanded = new Set(expandedTopics);
    if (newExpanded.has(topic)) {
      newExpanded.delete(topic);
    } else {
      newExpanded.add(topic);
    }
    setExpandedTopics(newExpanded);
  };

  const getDifficultyColor = (difficulty: 'Easy' | 'Medium' | 'Hard') => {
    switch (difficulty) {
      case 'Easy': return 'bg-emerald-100 text-emerald-800';
      case 'Medium': return 'bg-amber-100 text-amber-800';
      case 'Hard': return 'bg-rose-100 text-rose-800';
    }
  };

  const clearAllFilters = () => {
    setSearchTerm(''); setSelectedDifficulty('all'); setSelectedCompany('all'); setSelectedTopic('all'); setShowCompleted('all'); setShowStarred(false);
  };

  return (
     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl mb-6 shadow-xl"><BookOpen className="w-10 h-10 text-white" /></div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-4">DSA Mastery Hub</h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Track your journey across {problems.length} essential problems.
            </p>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300 group"><div className="flex items-center justify-between mb-6"><div><p className="text-sm font-semibold text-gray-600 mb-2">Overall Progress</p><p className="text-4xl font-bold text-gray-900">{stats.completed}<span className="text-xl text-gray-500">/{stats.total}</span></p></div><div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300"><Target className="w-8 h-8 text-white" /></div></div><div className="space-y-3"><div className="flex justify-between text-sm"><span className="text-gray-600">Completion Rate</span><span className="font-bold text-blue-600">{stats.percentage}%</span></div><div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden"><div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-1000 ease-out shadow-sm" style={{ width: `${stats.percentage}%` }} /></div></div></div>
            <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300 group"><div className="flex items-center justify-between mb-6"><div><p className="text-sm font-semibold text-gray-600 mb-2">Easy Problems</p><p className="text-4xl font-bold text-emerald-600">{stats.easy.completed}<span className="text-xl text-gray-500">/{stats.easy.total}</span></p></div><div className="bg-gradient-to-r from-emerald-500 to-green-500 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300"><CheckCircle2 className="w-8 h-8 text-white" /></div></div><div className="w-full bg-emerald-100 rounded-full h-3"><div className="bg-gradient-to-r from-emerald-500 to-green-500 h-3 rounded-full transition-all duration-1000" style={{ width: `${stats.easy.total > 0 ? (stats.easy.completed / stats.easy.total) * 100 : 0}%` }} /></div></div>
            <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300 group"><div className="flex items-center justify-between mb-6"><div><p className="text-sm font-semibold text-gray-600 mb-2">Medium Problems</p><p className="text-4xl font-bold text-amber-600">{stats.medium.completed}<span className="text-xl text-gray-500">/{stats.medium.total}</span></p></div><div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300"><TrendingUp className="w-8 h-8 text-white" /></div></div><div className="w-full bg-amber-100 rounded-full h-3"><div className="bg-gradient-to-r from-amber-500 to-orange-500 h-3 rounded-full transition-all duration-1000" style={{ width: `${stats.medium.total > 0 ? (stats.medium.completed / stats.medium.total) * 100 : 0}%` }} /></div></div>
            <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300 group"><div className="flex items-center justify-between mb-6"><div><p className="text-sm font-semibold text-gray-600 mb-2">Hard Problems</p><p className="text-4xl font-bold text-rose-600">{stats.hard.completed}<span className="text-xl text-gray-500">/{stats.hard.total}</span></p></div><div className="bg-gradient-to-r from-rose-500 to-red-500 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300"><Trophy className="w-8 h-8 text-white" /></div></div><div className="w-full bg-rose-100 rounded-full h-3"><div className="bg-gradient-to-r from-rose-500 to-red-500 h-3 rounded-full transition-all duration-1000" style={{ width: `${stats.hard.total > 0 ? (stats.hard.completed / stats.hard.total) * 100 : 0}%` }} /></div></div>
        </div>

        {/* Filters */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl p-8 mb-8 border border-white/20">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-4"><Filter className="w-8 h-8 text-blue-600" />Smart Filters</h2>
            <div className="flex items-center gap-4">
              <button onClick={() => setShowStarred(!showStarred)} className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${showStarred ? 'bg-yellow-100 text-yellow-800 shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  <Star className={`w-5 h-5 ${showStarred ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'}`} />
                  <span>Starred</span>
              </button>
              <button onClick={clearAllFilters} className="px-6 py-3 text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200">Clear All</button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-2"><label className="block text-sm font-bold text-gray-700 mb-3">Search Problems</label><div className="relative"><Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" /><input type="text" placeholder="Search by problem name..." className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm transition-all duration-200 text-gray-900 placeholder-gray-500" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div></div>
            <div><label className="block text-sm font-bold text-gray-700 mb-3">Difficulty</label><select className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm transition-all duration-200 text-gray-900" value={selectedDifficulty} onChange={(e) => setSelectedDifficulty(e.target.value)}><option value="all">All</option><option value="Easy">Easy</option><option value="Medium">Medium</option><option value="Hard">Hard</option></select></div>
            <div><label className="block text-sm font-bold text-gray-700 mb-3">Status</label><select className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm transition-all duration-200 text-gray-900" value={showCompleted} onChange={(e) => setShowCompleted(e.target.value)}><option value="all">All</option><option value="completed">Completed</option><option value="pending">Pending</option></select></div>
          </div>
        </div>

        {/* Problems Display */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20">
            {Object.entries(groupedProblems).map(([topic, topicProblems]) => (
              <div key={topic} className="border-b border-gray-100 last:border-b-0">
                <button onClick={() => toggleTopic(topic)} className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-50/50 transition-colors duration-200">
                  <div className="flex items-center gap-4">
                    {expandedTopics.has(topic) ? <ChevronDown className="w-5 h-5 text-gray-500"/> : <ChevronRight className="w-5 h-5 text-gray-500"/>}
                    <h3 className="text-xl font-bold text-gray-800">{topic}</h3>
                    <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">{topicProblems.length} problems</span>
                  </div>
                  <div className="w-1/4 bg-gray-200 rounded-full h-2"><div className="bg-blue-500 h-2 rounded-full" style={{width: `${topicProblems.length > 0 ? (topicProblems.filter(p=>p.completed).length / topicProblems.length) * 100 : 0}%`}}></div></div>
                </button>
                {expandedTopics.has(topic) && (
                  <div>
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-16">Status</th>
                          <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-16">Favorite</th>
                          <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Problem</th>
                          <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Difficulty</th>
                          <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Companies</th>
                          <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {topicProblems.map(problem => (
                          <tr key={problem.id} className={`${problem.completed ? 'bg-emerald-50/30' : 'bg-white'} hover:bg-blue-50/50 transition-colors duration-200`}>
                            <td className="px-8 py-5">
                              <button onClick={() => toggleProblem(problem.id)} className="hover:scale-110 transition-transform">
                                {problem.completed ? <CheckCircle2 className="w-6 h-6 text-emerald-500"/> : <Circle className="w-6 h-6 text-gray-300"/>}
                              </button>
                            </td>
                            <td className="px-8 py-5">
                              <button onClick={() => toggleStarred(problem.id)} className="hover:scale-110 transition-transform">
                                <Star className={`w-6 h-6 transition-colors ${problem.starred ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 hover:text-yellow-300'}`} />
                              </button>
                            </td>
                            <td className="px-8 py-5">
                              <p className={`font-semibold text-gray-800 ${problem.completed ? 'line-through text-gray-500' : ''}`}>{problem.name}</p>
                              {problem.leetcodeNumber && <span className="text-xs text-gray-400">LeetCode #{problem.leetcodeNumber}</span>}
                            </td>
                            <td className="px-8 py-5">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${getDifficultyColor(problem.difficulty)}`}>
                                    {problem.difficulty}
                                </span>
                            </td>
                            <td className="px-8 py-5">
                               <CompanyTooltip companies={problem.companies} visibleCount={4} />
                            </td>
                            <td className="px-8 py-5">
                                {problem.leetcodeNumber &&
                                    <a href={`https://leetcode.com/problems/${problem.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')}/`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold text-sm">
                                        <ExternalLink className="w-4 h-4"/>
                                        Solve
                                    </a>
                                }
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
        </div>

        {/* No Problems Found */}
        {filteredProblems.length === 0 && (
          <div className="text-center py-20 bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 mt-8">
            <div className="text-gray-400 mb-8"><Search className="w-20 h-20 mx-auto" /></div><h3 className="text-3xl font-bold text-gray-900 mb-4">No problems found</h3>
            <p className="text-gray-600 text-xl mb-8 max-w-md mx-auto">Try adjusting your search criteria or filters to find what you're looking for.</p>
            <button onClick={clearAllFilters} className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold rounded-2xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-xl hover:shadow-2xl">Clear All Filters</button>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-16 py-8 border-t border-gray-200">
            <div className="flex items-center justify-center gap-4 text-gray-600 mb-4"><Clock className="w-5 h-5" /><span>Progress automatically saved to your browser</span></div>
            <div className="flex items-center justify-center gap-8 text-sm text-gray-500"><div className="flex items-center gap-2"><Users className="w-4 h-4" /><span>{Object.keys(COMPANY_DOMAINS).length}+ Companies Tracked</span></div><div className="flex items-center gap-2"><Zap className="w-4 h-4" /><span>Real-time Analytics</span></div><div className="flex items-center gap-2"><Award className="w-4 h-4" /><span>Progress Gamification</span></div></div>
            <div className="mt-6 text-xs text-gray-400"><p>Built with ❤️ for coding enthusiasts • {problems.length} Problems</p></div>
        </div>
      </div>
    </div>
  );
}

export default App;
