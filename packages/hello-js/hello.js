/*
 * ByteOS Sample JavaScript Application
 * Runs natively on ByteOS using embedded QuickJS ES2020 Engine
 */

console.log("==========================================");
console.log(" Hello from ByteOS JavaScript Application!");
console.log(" Running on QuickJS ES2020 Web Engine");
console.log("==========================================");

// Accessing Web APIs
console.log("Platform User Agent: " + navigator.userAgent);

// Using LocalStorage
localStorage.setItem("last_run", "2026-11-13");
localStorage.setItem("app_name", "HelloJS");
console.log("Saved to LocalStorage: app_name=" + localStorage.getItem("app_name"));

// Modern ES2020 Features: Arrays, lambdas, destructuring, BigInt
const scores = [10, 25, 42, 99];
const doubled = scores.map(x => x * 2);
const total = doubled.reduce((sum, val) => sum + val, 0);

console.log("Calculated total: " + total);

// Document manipulation
if (typeof document !== 'undefined') {
    document.title = "Hello JS on ByteOS";
    console.log("Updated document title to: " + document.title);
}

console.log("JavaScript application executed successfully!");
