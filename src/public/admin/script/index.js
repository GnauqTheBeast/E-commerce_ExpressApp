// Filter Product 
const btnFilter = document.querySelectorAll('[btn-status]');
if(btnFilter) {
    let url = new URL(window.location.href);
    btnFilter.forEach(btn_status => { 
        btn_status.onclick = () => {
            const status = btn_status.getAttribute('btn-status');
            status ? url.searchParams.set('status', status) : url.searchParams.delete('status');
            window.location = url;
        }
    });
}
// Search bar 
const formSearch = document.querySelector('#form-search');
const searchBar = document.querySelector('.search-bar');
if(formSearch) {
    let url = new URL(window.location.href);
    formSearch.onsubmit = (e) => {
        e.preventDefault();
        const keyword = e.target.elements.keyword.value;
        if(keyword) {
            url.searchParams.set('keyword', keyword);
        }
        else {
            url.searchParams.delete('keyword');
        }
        window.location = url;
    }
}
// Pagination
const pageNumbers = document.querySelectorAll('[page-number]');
const previousPage = document.querySelector('.previous-page');
const nextPage = document.querySelector('.next-page');
if(pageNumbers && previousPage && nextPage) {
    let url = new URL(window.location.href);
    let currentPage = parseInt(url.searchParams.get('page'));
    // Previous Button
    (currentPage === 1 || !currentPage) ? previousPage.classList.add('disable') : previousPage.classList.remove('disable');
    previousPage.onclick = () => { 
        // Check if currentPage != 1 and != isNaN
        if(currentPage != 1 && !isNaN(currentPage)) {
            url.searchParams.set('page', currentPage - 1);
            window.location = url;
        }
    }
    // Next Button
    currentPage === pageNumbers.length ? nextPage.classList.add('disable') : nextPage.classList.remove('disable');
    nextPage.onclick = () => { 
        if(isNaN(currentPage)) 
            currentPage = 1;
        if(currentPage != pageNumbers.length) {
            url.searchParams.set('page', currentPage + 1);
            window.location = url;
        }
    }
    // Page Number Button
    pageNumbers.forEach(page => {
        page.onclick = () => {
            const pageNumber = page.getAttribute('page-number');
            url.searchParams.set('page', pageNumber);
            window.location = url;
        }
    });
}   
// Hidden Showing Alert
const exitBtnAlert = document.querySelector('.message i'); 
const Alert = document.querySelector('.message');
if(exitBtnAlert) {
    exitBtnAlert.addEventListener('click', () => {
        Alert.remove();
    });
    const timeDelay = +Alert.getAttribute('time-delay');
    setTimeout(() => {
        if(Alert) Alert.remove();
    }, timeDelay + 500)
}
// Sort Button
const btnSort = document.querySelectorAll('[btn-sort]');
if(btnSort) {
    let url = new URL(window.location.href);
    btnSort.forEach(btn_sort => { 
        btn_sort.onclick = () => {
            const btn_sort_attribute = btn_sort.getAttribute('btn-sort');
            if(btn_sort_attribute==='-') {
                url.searchParams.delete('sortKey');
                url.searchParams.delete('sortValue');
            }
            else {
                const [field, sortType] = btn_sort_attribute.split('-');
                url.searchParams.set('sortKey', field);
                url.searchParams.set('sortValue', sortType);
            }
            window.location = url;
        }
    });
}