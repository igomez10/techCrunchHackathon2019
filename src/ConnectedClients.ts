
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
       return Date.now() - client.lastPingAt < 3 * 1000
    })
  }

  public addClient(client: ConnectedClient) {
    const existingClient = this.clients.find(c => {
      return client.ip === c.ip
    })
    if(existingClient) {
      existingClient.lastPingAt = client.lastPingAt
    } else {
      this.clients.push(client)
    }
  }
}

const c = new ConnectedClients()

export default c