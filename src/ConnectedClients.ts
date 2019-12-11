
interface ConnectedClient {
  name: string
  lastPingAt: number
  userAgent: string
  ip: string
  maxMemory: number
  cpu: number
}


class ConnectedClients {
  private clients: ConnectedClient[] = []

  get connectedClients() {
    return this.clients.filter((client) => {
       return Date.now() - client.lastPingAt < 30 * 1000
    })
  }

  public addClient(client: ConnectedClient) {
    this.clients.push(client)
  }
}

const c = new ConnectedClients()

export default c