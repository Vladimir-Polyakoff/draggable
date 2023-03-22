export const server = {
  getList: () => ({
    status: true,
    data: JSON.parse(localStorage.getItem('list')) || []
  }),
  saveList: list => localStorage.setItem('list', JSON.stringify(list)),

  createUser: user => {
    const { status, data } = server.getList()

    if (!status) { return { status: false, error: 'не удалось загрузить данные' } }

    data.forEach(dataUser => {
      if (dataUser.id === user.id) {
        return { status: false, error: 'такой пользователь уже существует' }
      }
    })

    server.saveList([...data, user])

    return { status: true }
  },

  getUser: id => {
    const { status, data } = server.getList()

    if (!status) { return { status: false, error: 'не удалось загрузить данные' } }

    const user = data.find(user => user.id === Number(id))

    return { status: true, data: user }
  },

  editUser: edited => {
    const { status, data } = server.getList()

    if (!status) { return { status: false, error: 'не удалось загрузить данные' } }

    for (const [index, user] of data.entries()) {
      if (user.id === edited.id) {
        data[index] = edited

        server.saveList(data)

        return { status: true }
      }
    }

    return { status: false, error: 'не удалось редактировать данные' }
  },

  deleteUsers: deleted => {
    const { status, data } = server.getList()

    if (!status) { return { status: false, error: 'не удалось загрузить данные' } }

    const updetedData = data.filter(({ id }) => !deleted.includes(id))

    server.saveList(updetedData)

    return { status: true }
  },

  setOrder: sortedList => {
    server.saveList(sortedList)

    return { status: true }
  },

  toggleStatus: (id, active) => {
    const { status, data } = server.getList()

    if (!status) { return { status: false } }

    const editing = data.find(item => item.id === id)
    editing.active = active

    server.saveList(data)

    return { status: true }
  }
}
