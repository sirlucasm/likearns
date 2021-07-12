function Pagination({ pagination, limit, page, setPage }) {
	const arrayPagination = [];
	const total = pagination.total;

	for(let index = 1; index <= Math.ceil(total / limit); index++) arrayPagination.push(index);

	return (
		<nav aria-label="...">
			<ul class="pagination pagination-sm">
				{
					arrayPagination.map((item, key) => (
						<li class={`page-item ${page == item && 'disabled'}`} key={key}>
							<a class="page-link" onClick={() => setPage(item)} href="#" tabindex="-1">{item}</a>
						</li>
					))
				}
			</ul>
		</nav>
	);
}

export default Pagination;
