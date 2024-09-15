async function heapify(ele, n, i) {
    console.log('In heapify()');
    let largest = i;  // Initialize largest as root
    let left = 2 * i + 1;  // left child index
    let right = 2 * i + 2;  // right child index

    // Color root element
    ele[largest].style.background = 'red';

    if (left < n && parseInt(ele[left].style.height) > parseInt(ele[largest].style.height)) {
        if (largest !== i) ele[largest].style.background = 'cyan'; // Revert the color
        largest = left;
        ele[largest].style.background = 'yellow';
    }

    if (right < n && parseInt(ele[right].style.height) > parseInt(ele[largest].style.height)) {
        if (largest !== i) ele[largest].style.background = 'cyan'; // Revert the color
        largest = right;
        ele[largest].style.background = 'yellow';
    }

    if (largest !== i) {
        swap(ele[i], ele[largest]);
        ele[i].style.background = 'orange';
        ele[largest].style.background = 'orange';

        // Pause for visualization
        await waitforme(delay);

        // Recursively heapify the affected sub-tree
        await heapify(ele, n, largest);
    } else {
        ele[i].style.background = 'cyan';
    }
}

async function heapSort(ele) {
    let n = ele.length;

    // Build heap (rearrange array)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(ele, n, i);
    }

    // One by one extract elements from heap
    for (let i = n - 1; i > 0; i--) {
        // Swap the root (largest element) with the last element
        swap(ele[0], ele[i]);
        ele[i].style.background = 'green'; // Sorted element
        ele[0].style.background = 'red';

        // Pause for visualization
        await waitforme(delay);

        // Call heapify on the reduced heap
        await heapify(ele, i, 0);

        // Set all unsorted elements to cyan after heapify
        for (let j = 0; j < i; j++) {
            if (ele[j].style.background !== 'green') {
                ele[j].style.background = 'cyan';
            }
        }
    }
    ele[0].style.background = 'green'; // Final sorted element
}

const heapSortbtn = document.querySelector(".HeapSort");
heapSortbtn.addEventListener('click', async function() {
    let ele = document.querySelectorAll('.bar');
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    await heapSort(ele);
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
});
