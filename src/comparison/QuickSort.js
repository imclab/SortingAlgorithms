(function(Sort, undef){

    //
    //  Comparison Algorithms
    //
    
    // auxilliaries
    var
        /*
        In very early versions of quicksort, the leftmost element of the partition would often be chosen as the pivot element. Unfortunately, this causes worst-case behavior on already sorted arrays, which is a rather common use-case. The problem was easily solved by choosing either a random index for the pivot, choosing the middle index of the partition or (especially for longer partitions) choosing the median of the first, middle and last element of the partition for the pivot (as recommended by Sedgewick).[4][5]

        Selecting a pivot element is also complicated by the existence of integer overflow. If the boundary indices of the subarray being sorted are sufficiently large, the naïve expression for the middle index, (left + right)/2, will cause overflow and provide an invalid pivot index. This can be overcome by using, for example, left + (right-left)/2 to index the middle element, at the cost of more complex arithmetic. Similar issues arise in some other methods of selecting the pivot element.
        */
        Partition = function(a, left, right) {
            // left is the index of the leftmost element of the subarray
            // right is the index of the rightmost element of the subarray (inclusive)
            // number of elements in subarray = right-left+1
            var pivotIndex, pivotValue, t, storeIndex, i;
            
            // See "#Choice of pivot" section below for possible choices
            //choose any pivotIndex such that left ≤ pivotIndex ≤ right
            pivotIndex = ~~(left + 0.5*(right-left/*+1*/));  pivotValue=a[pivotIndex];
            t=a[pivotIndex]; a[pivotIndex]=a[right]; a[right]=t;
            storeIndex=left;
            
            for (i=left; i<right; i++)  // left ≤ i < right
            {
                if (a[i] <= pivotValue)
                {
                    t=a[i]; a[i]=a[storeIndex]; a[storeIndex]=t;
                    storeIndex++;
                }
            }
            t=a[storeIndex]; a[storeIndex]=a[right]; a[right]=t;  // Move pivot to its final place
            return storeIndex;
        }
    ;
    
    var RecursiveQuickSort = Sort.RecursiveQuickSort = function(a, left, right)  {
        if (undef===left && undef===right) { left=0; right=a.length-1; }
        
        // If the list has 2 or more items
        if (left < right)
        {
            var pivotNewIndex;
            
            // Get lists of bigger and smaller items and final position of pivot
            pivotNewIndex = Partition(a, left, right);
            // Recursively sort elements smaller than the pivot
            RecursiveQuickSort(a, left, pivotNewIndex - 1);
            // Recursively sort elements at least as big as the pivot
            RecursiveQuickSort(a, pivotNewIndex + 1, right);
        }
        // in-place
        return a;
    };
    Sort.RecursiveQuickSort.reference = "http://en.wikipedia.org/wiki/Quicksort";
    
    // http://www.geeksforgeeks.org/iterative-quick-sort/
    Sort.QuickSort = function(a, left, right) {
        if (undef===left && undef===right) { left=0; right=a.length-1; }
        
        // If the list has 2 or more items
        if (left < right)
        {
            var stack, top, N, p;
        
            N = right - left + 1;
            // Create an auxiliary stack
            stack = new Array(N);
            // initialize top of stack
            top = -1;
         
            // push initial values of left and right to stack
            stack[ ++top ] = left;
            stack[ ++top ] = right;
         
            // Keep popping from stack while is not empty
            while ( top >= 0 )
            {
                // Pop right and left
                right = stack[ top-- ];
                left = stack[ top-- ];
         
                // Set pivot element at its correct position in sorted array
                p = Partition( a, left, right );
         
                // If there are elements on left side of pivot, then push left
                // side to stack
                if ( p-1 > left )
                {
                    stack[ ++top ] = left;
                    stack[ ++top ] = p - 1;
                }
         
                // If there are elements on right side of pivot, then push right
                // side to stack
                if ( p+1 < right )
                {
                    stack[ ++top ] = p + 1;
                    stack[ ++top ] = right;
                }
            }
        }
        // in-place
        return a;
    };
    Sort.QuickSort.reference = "http://en.wikipedia.org/wiki/Quicksort";
    
    
})(Sort);