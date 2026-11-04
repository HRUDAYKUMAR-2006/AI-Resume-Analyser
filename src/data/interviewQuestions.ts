import { InterviewQuestion } from '../types';

export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  {
    id: 'dsa-1',
    title: 'Two Sum & Pair Target Hash Optimization',
    difficulty: 'Easy',
    category: 'Arrays & Hashing (DSA Core)',
    pathId: 'all',
    prompt: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume that each input would have exactly one solution, and you may not use the same element twice. You must return an optimal O(n) solution using an in-memory hash map.',
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]', explanation: 'nums[1] + nums[2] == 6.' }
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      'Only one valid answer exists.'
    ],
    starterCode: {
      python: `def twoSum(nums: list[int], target: int) -> list[int]:
    # Write your optimal O(n) hash map solution here
    seen = {}
    pass
`,
      javascript: `function twoSum(nums, target) {
    // Write your optimal O(n) hash map solution here
    const seen = new Map();
    
}
`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your optimal O(n) HashMap solution
        return new int[]{};
    }
}
`,
      cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your optimal O(n) unordered_map solution
        return {};
    }
};
`
    },
    solutionCode: {
      python: `def twoSum(nums: list[int], target: int) -> list[int]:
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []
`,
      javascript: `function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}
`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[0];
    }
}
`,
      cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> map;
        for (int i = 0; i < nums.size(); ++i) {
            int complement = target - nums[i];
            if (map.count(complement)) {
                return {map[complement], i};
            }
            map[nums[i]] = i;
        }
        return {};
    }
};
`
    },
    timeComplexity: 'O(n) - Single pass through the array',
    spaceComplexity: 'O(n) - Auxiliary hash map storage',
    hints: [
      'Can you solve this without the brute force O(n^2) nested loop?',
      'As you iterate over the array, compute the complement (target - num). Check if the complement already exists in your hash map.'
    ]
  },
  {
    id: 'dsa-2',
    title: 'LRU Cache Design & Concurrency',
    difficulty: 'Hard',
    category: 'Data Structures & System Design',
    pathId: 'all',
    prompt: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement the `LRUCache` class with `get(key)` and `put(key, value)` both running in strict O(1) average time complexity using a doubly linked list combined with a hash map.',
    examples: [
      {
        input: 'LRUCache(2); put(1, 1); put(2, 2); get(1); put(3, 3); get(2);',
        output: '[null, null, null, 1, null, -1]',
        explanation: 'Key 2 was evicted when key 3 was inserted because key 2 was the least recently accessed.'
      }
    ],
    constraints: [
      '1 <= capacity <= 3000',
      '0 <= key <= 10^4',
      'At most 2 * 10^5 calls will be made to get and put.'
    ],
    starterCode: {
      python: `class Node:
    def __init__(self, key=0, val=0):
        self.key, self.val = key, val
        self.prev = self.next = None

class LRUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        # Implement doubly-linked list sentinel head & tail + hash map

    def get(self, key: int) -> int:
        pass

    def put(self, key: int, value: int) -> None:
        pass
`,
      javascript: `class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.map = new Map();
    }
    get(key) {
        // Implement O(1) get with access reordering
    }
    put(key, value) {
        // Implement O(1) put with LRU eviction
    }
}
`
    },
    solutionCode: {
      python: `class Node:
    def __init__(self, key=0, val=0):
        self.key, self.val = key, val
        self.prev = self.next = None

class LRUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.cache = {}
        self.head, self.tail = Node(), Node()
        self.head.next, self.tail.prev = self.tail, self.head

    def _remove(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev

    def _insert(self, node):
        node.next = self.head.next
        node.prev = self.head
        self.head.next.prev = node
        self.head.next = node

    def get(self, key: int) -> int:
        if key in self.cache:
            node = self.cache[key]
            self._remove(node)
            self._insert(node)
            return node.val
        return -1

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self._remove(self.cache[key])
        node = Node(key, value)
        self.cache[key] = node
        self._insert(node)
        if len(self.cache) > self.cap:
            lru = self.tail.prev
            self._remove(lru)
            del self.cache[lru.key]
`,
      javascript: `class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.map = new Map();
    }
    get(key) {
        if (!this.map.has(key)) return -1;
        const val = this.map.get(key);
        this.map.delete(key);
        this.map.set(key, val);
        return val;
    }
    put(key, value) {
        if (this.map.has(key)) {
            this.map.delete(key);
        } else if (this.map.size >= this.capacity) {
            const firstKey = this.map.keys().next().value;
            this.map.delete(firstKey);
        }
        this.map.set(key, value);
    }
}
`
    },
    timeComplexity: 'O(1) for both get() and put() operations',
    spaceComplexity: 'O(capacity) space bound',
    hints: [
      'A hash map alone cannot order by recency in O(1). A doubly linked list alone cannot search keys in O(1). Combine both!',
      'In JavaScript, Map preserves insertion order; deleting and re-inserting moves a key to the end.'
    ]
  },
  {
    id: 'dsa-3',
    title: 'Valid Palindrome & Two Pointer Convergence',
    difficulty: 'Easy',
    category: 'Strings & Two Pointers',
    pathId: 'all',
    prompt: 'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Implement an in-place two-pointer algorithm with O(1) extra memory.',
    examples: [
      { input: 's = "A man, a plan, a canal: Panama"', output: 'true', explanation: '"amanaplanacanalpanama" is a palindrome.' },
      { input: 's = "race a car"', output: 'false', explanation: '"raceacar" is not a palindrome.' }
    ],
    constraints: [
      '1 <= s.length <= 2 * 10^5',
      's consists only of printable ASCII characters.'
    ],
    starterCode: {
      python: `def isPalindrome(s: str) -> bool:
    # Write two pointer algorithm here
    pass
`,
      javascript: `function isPalindrome(s) {
    // Write two pointer algorithm here
}
`
    },
    solutionCode: {
      python: `def isPalindrome(s: str) -> bool:
    l, r = 0, len(s) - 1
    while l < r:
        while l < r and not s[l].isalnum():
            l += 1
        while l < r and not s[r].isalnum():
            r -= 1
        if s[l].lower() != s[r].lower():
            return False
        l += 1
        r -= 1
    return True
`,
      javascript: `function isPalindrome(s) {
    let l = 0, r = s.length - 1;
    const isAlnum = (ch) => /[a-zA-Z0-9]/.test(ch);
    while (l < r) {
        while (l < r && !isAlnum(s[l])) l++;
        while (l < r && !isAlnum(s[r])) r--;
        if (s[l].toLowerCase() !== s[r].toLowerCase()) return false;
        l++;
        r--;
    }
    return true;
}
`
    },
    timeComplexity: 'O(n) - Linear pass through string',
    spaceComplexity: 'O(1) - Constant auxiliary space',
    hints: [
      'Use two pointers starting at opposite ends.',
      'Skip non-alphanumeric characters and compare lowercase values.'
    ]
  },
  {
    id: 'dsa-4',
    title: 'Course Schedule & Topological Sort (Kahn\'s Algorithm)',
    difficulty: 'Medium',
    category: 'Graph Algorithms & DAGs',
    pathId: 'fullstack',
    prompt: 'There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [a, b]` indicates that you must take course `b` first if you want to take course `a`. Return `true` if you can finish all courses; otherwise, return `false` (detect if cycle exists in directed graph).',
    examples: [
      { input: 'numCourses = 2, prerequisites = [[1,0]]', output: 'true', explanation: 'Course 0 must be taken before course 1. Possible.' },
      { input: 'numCourses = 2, prerequisites = [[1,0],[0,1]]', output: 'false', explanation: 'Circular prerequisite dependency.' }
    ],
    constraints: [
      '1 <= numCourses <= 2000',
      '0 <= prerequisites.length <= 5000',
      'All the pairs prerequisites[i] are unique.'
    ],
    starterCode: {
      python: `def canFinish(numCourses: int, prerequisites: list[list[int]]) -> bool:
    # Build adjacency list & in-degree array for BFS topological sort
    pass
`,
      javascript: `function canFinish(numCourses, prerequisites) {
    // Implement Kahn's BFS topological sort or DFS cycle detection
}
`
    },
    solutionCode: {
      python: `from collections import deque

def canFinish(numCourses: int, prerequisites: list[list[int]]) -> bool:
    adj = {i: [] for i in range(numCourses)}
    in_degree = [0] * numCourses
    for dest, src in prerequisites:
        adj[src].append(dest)
        in_degree[dest] += 1

    queue = deque([i for i in range(numCourses) if in_degree[i] == 0])
    visited_count = 0

    while queue:
        node = queue.popleft()
        visited_count += 1
        for neighbor in adj[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    return visited_count == numCourses
`,
      javascript: `function canFinish(numCourses, prerequisites) {
    const adj = Array.from({ length: numCourses }, () => []);
    const inDegree = new Array(numCourses).fill(0);

    for (const [dest, src] of prerequisites) {
        adj[src].push(dest);
        inDegree[dest]++;
    }

    const queue = [];
    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) queue.push(i);
    }

    let count = 0;
    while (queue.length > 0) {
        const curr = queue.shift();
        count++;
        for (const neighbor of adj[curr]) {
            inDegree[neighbor]--;
            if (inDegree[neighbor] === 0) queue.push(neighbor);
        }
    }
    return count === numCourses;
}
`
    },
    timeComplexity: 'O(V + E) where V is numCourses and E is prerequisites count',
    spaceComplexity: 'O(V + E) for adjacency graph representation',
    hints: [
      'Represent courses as directed graph edges (src -> dest).',
      'Compute the in-degree of all nodes and initiate BFS queue with nodes having 0 in-degree.'
    ]
  }
];

