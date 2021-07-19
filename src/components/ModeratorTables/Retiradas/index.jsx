import {
	Div,
	TableArea,
	NoWithdraw,
	StatusCaptionArea,
	StatusCaption,
	ActionArea,
	ActionButton,
} from '../../../styles/components/ModerationTables/RetiradasTable';
import {
	convertWithdrawTypeToString,
	convertValueToEarns,
	convertStatusToBgColor,
	convertStatusToString
} from '../../../utils';
import Pagination from '../../Pagination';

// icons
import {
	FaRegSadTear
} from 'react-icons/fa';
import {
	MdDone,
	MdCancel
} from 'react-icons/md';

function RetiradasTable({
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
									<th scope="col">Ação</th>
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
											<td>
												<ActionArea>
													<ActionButton title="Aprovar">
														<MdDone />
													</ActionButton>
													<ActionButton title="Reprovar">
														<MdCancel />
													</ActionButton>
												</ActionArea>
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
							<h3>Nenhuma retirada foi feita por esse usuário ainda</h3>
						</div>
					</NoWithdraw>
			}
		</Div>
	);
}

export default RetiradasTable;
