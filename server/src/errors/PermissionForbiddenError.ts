class PermissionForbiddenError extends Error {
  constructor (message?: string) {
    super(message)
    this.name = 'PermissionForbiddenError'

    Object.setPrototypeOf(this, PermissionForbiddenError.prototype)
  }
}

export default PermissionForbiddenError
