import {
	Div,
	TableArea,
	NoWithdraw
} from '../../styles/components/WithdrawTable';
import {
	convertWithdrawTypeToString,
	convertValueToEarns
} from '../../utils';

// icons
import {
	FaRegSadTear
} from 'react-icons/fa';
import Pagination from '../Pagination';

function WithdrawsTable({
	withdraws,
	page,
	limit,
	setPage
}) {
	return (
		<Div>
			{
				withdraws?.users_withdraws?.length > 0 ?
				<TableArea>
					<table class="table table-hover">
						<thead>
							<tr>
								<th scope="col">cód</th>
								<th scope="col">Tipo</th>
								<th scope="col">Valor(R$)</th>
								<th scope="col">Pontos perdidos</th>
								<th scope="col">Status</th>
							</tr>
						</thead>
						<tbody>
							{
								withdraws.users_withdraws.map((withdraw, key) => (
									<tr key={key}>
										<th scope="row">{withdraw.id}</th>
										<td>{convertWithdrawTypeToString(withdraw.withdraw_type)}</td>
										<td>{convertValueToEarns(withdraw.value)}</td>
										<td>{withdraw.lost_points}</td>
										<td>{withdraw.status}</td>
									</tr>
								))
							}
						</tbody>
					</table>
					<Pagination
						pagination={withdraws?.pagination}
						page={page}
						limit={limit}
						setPage={setPage}
					/>
				</TableArea>
				:
				<NoWithdraw>
					<FaRegSadTear size={56} />
					<div>
						<h3>Nenhuma retirada foi feita ainda</h3>
					</div>
				</NoWithdraw>
			}
		</Div>
	);
}

export default WithdrawsTable;
