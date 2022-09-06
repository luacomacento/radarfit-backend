import { INTEGER, FLOAT, STRING, Model } from 'sequelize';
import database from './';

class Produto extends Model {
  declare id: number
  declare produto: string
  declare valor: number
  declare descricao: string
}

Produto.init({
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  produto: {
    type: STRING,
    allowNull: false
  },
  valor: {
    type: FLOAT,
    allowNull: false
  },
  descricao: {
    type: STRING,
    allowNull: false
  },
}, {
  tableName: 'produtos',
  sequelize: database,
  timestamps: true,
  createdAt: 'created',
  updatedAt: 'updated'
});

export default Produto;