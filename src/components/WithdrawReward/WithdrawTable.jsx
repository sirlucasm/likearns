import {
	Div,
	TableArea,
	NoWithdraw,
	StatusCaptionArea,
	StatusCaption
} from '../../styles/components/WithdrawTable';
import {
	convertWithdrawTypeToString,
	convertValueToEarns,
	convertStatusToBgColor,
	convertStatusToString
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
											<td>
												<div
													style={{
														background: convertStatusToBgColor(withdraw.status),
														borderRadius: 50,
														width: 39,
														height: 18
													}}
													title={convertStatusToString(withdraw.status)}
												></div>
											</td>
										</tr>
									))
								}
							</tbody>
						</table>
						<StatusCaptionArea>
							{
								[0, 1, 2, 3].map((status) => (
									<StatusCaption
										key={status}
										bgColor={convertStatusToBgColor(status)}
									>
										<div></div>
										<span>{convertStatusToString(status)}</span>
									</StatusCaption>
								))
							}
						</StatusCaptionArea>
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
