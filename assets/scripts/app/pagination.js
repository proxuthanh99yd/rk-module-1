
function Pagination(totalPage) {

    if (!JSON.parse(localStorage.getItem('currentPage'))) {
        current(1)
    }

    function current(current = JSON.parse(localStorage.getItem('currentPage')) * 1.0) {
        localStorage.setItem('currentPage', current);
        return JSON.parse(localStorage.getItem('currentPage')) * 1.0
    }

    const paginateAction = (totalPage) => {
        getPaginationNumbers(totalPage);
        document.querySelector('.pagination-container').onclick = (e) => {
            const pageNum = e.target.closest('.pagination-number');
            if (pageNum) {
                current(pageNum.dataset.pageindex)
                pageActive();
                this.action(current())
            }

            const next = e.target.closest('#next-button');
            if (next) {
                current(current() * 1.0 + 1);
                if (current() >= totalPage) {
                    current(totalPage)
                }
                pageActive();
                this.action(current())
            }

            const prev = e.target.closest('#prev-button')
            if (prev) {
                current(current() * 1.0 - 1);
                if (current() <= 1) {
                    current(1)
                }
                pageActive();
                this.action(current())
            }
        }
    }

    function pageActive() {
        document.querySelectorAll('.pagination-number').forEach(btn => {
            if (btn.dataset.pageindex == current()) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        })
    }

    function addPageControl() {
        const pageNext = document.createElement("button");
        pageNext.className = "pagination-button";
        pageNext.id = "next-button";
        pageNext.innerHTML = '&gt;'

        const pagePrev = document.createElement("button");
        pagePrev.className = "pagination-button";
        pagePrev.id = "prev-button";
        pagePrev.innerHTML = '&lt;'

        const pageNumber = document.createElement("div");
        pageNumber.id = "pagination-numbers";

        document.querySelector('.pagination-container').innerHTML = '';
        document.querySelector('.pagination-container').appendChild(pagePrev);
        document.querySelector('.pagination-container').appendChild(pageNumber);
        document.querySelector('.pagination-container').appendChild(pageNext);
    }

    function appendPageNumber(index) {
        const pageNumber = document.createElement("button");
        pageNumber.className = "pagination-number";
        pageNumber.innerHTML = index;
        pageNumber.setAttribute("data-pageIndex", index);
        pageNumber.setAttribute("aria-label", "Page " + index);
        document.querySelector('#pagination-numbers').appendChild(pageNumber);
    };

    function getPaginationNumbers(pageCount) {
        document.querySelector('#pagination-numbers').innerHTML = '';
        for (let i = 1; i <= pageCount; i++) {
            appendPageNumber(i);
        }
    };

    this.pageNumber = function (totalPage) {
        addPageControl();
        getPaginationNumbers(totalPage);
        paginateAction(totalPage);
        pageActive();
    };

    addPageControl();
    getPaginationNumbers(totalPage);
    paginateAction(totalPage);
    pageActive();

    this.gotoPage = function (gotoPage = current()) {
        current(gotoPage);
        this.action(current());
        addPageControl();
        getPaginationNumbers(totalPage);
        pageActive();

    }

}

export default Pagination;