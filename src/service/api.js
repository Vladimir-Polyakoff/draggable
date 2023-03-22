import { server } from './server'

export default {
  get: {
    list: () => server.getList(),
    user: id => server.getUser(id)
  },
  // создаем CREATE
  post: {
    user: user => server.createUser(user)
  },
  // Меняем или PUT
  patch: {
    toggleStatus: (id, active) => server.toggleStatus(id, active),
    user: user => server.editUser(user),
    setOrder: sortedList => server.setOrder(sortedList)
  },
  delete: {
    deleteUsers: deleted => server.deleteUsers(deleted)
  }
}
