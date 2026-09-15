export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      abastecimentos: {
        Row: {
          aprovado_em: string | null
          aprovado_por_perfil_id: string | null
          bomba_id: string | null
          ciclo_id: string | null
          created_at: string | null
          data: string
          destino_livre: string | null
          fazenda_id: string
          funcionario_id: string | null
          horimetro: number | null
          id: string
          insumo_id: string | null
          insumo_movimentado_id: string | null
          km: number | null
          lancado_por_perfil_id: string | null
          lancamento_id: string | null
          maquina_descricao: string | null
          maquina_id: string | null
          motivo_rejeicao: string | null
          observacao: string | null
          operador: string | null
          origem_lancamento: string
          origem_op_id: string | null
          patrimonio: string | null
          quantidade_l: number
          status_campo: string
          tipo_combustivel: string | null
          valor_total: number
          valor_unitario: number
        }
        Insert: {
          aprovado_em?: string | null
          aprovado_por_perfil_id?: string | null
          bomba_id?: string | null
          ciclo_id?: string | null
          created_at?: string | null
          data?: string
          destino_livre?: string | null
          fazenda_id: string
          funcionario_id?: string | null
          horimetro?: number | null
          id?: string
          insumo_id?: string | null
          insumo_movimentado_id?: string | null
          km?: number | null
          lancado_por_perfil_id?: string | null
          lancamento_id?: string | null
          maquina_descricao?: string | null
          maquina_id?: string | null
          motivo_rejeicao?: string | null
          observacao?: string | null
          operador?: string | null
          origem_lancamento?: string
          origem_op_id?: string | null
          patrimonio?: string | null
          quantidade_l: number
          status_campo?: string
          tipo_combustivel?: string | null
          valor_total?: number
          valor_unitario?: number
        }
        Update: {
          aprovado_em?: string | null
          aprovado_por_perfil_id?: string | null
          bomba_id?: string | null
          ciclo_id?: string | null
          created_at?: string | null
          data?: string
          destino_livre?: string | null
          fazenda_id?: string
          funcionario_id?: string | null
          horimetro?: number | null
          id?: string
          insumo_id?: string | null
          insumo_movimentado_id?: string | null
          km?: number | null
          lancado_por_perfil_id?: string | null
          lancamento_id?: string | null
          maquina_descricao?: string | null
          maquina_id?: string | null
          motivo_rejeicao?: string | null
          observacao?: string | null
          operador?: string | null
          origem_lancamento?: string
          origem_op_id?: string | null
          patrimonio?: string | null
          quantidade_l?: number
          status_campo?: string
          tipo_combustivel?: string | null
          valor_total?: number
          valor_unitario?: number
        }
        Relationships: [
          {
            foreignKeyName: "abastecimentos_aprovado_por_perfil_id_fkey"
            columns: ["aprovado_por_perfil_id"]
            isOneToOne: false
            referencedRelation: "perfis"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "abastecimentos_bomba_id_fkey"
            columns: ["bomba_id"]
            isOneToOne: false
            referencedRelation: "bombas_combustivel"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "abastecimentos_ciclo_id_fkey"
            columns: ["ciclo_id"]
            isOneToOne: false
            referencedRelation: "ciclos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "abastecimentos_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "abastecimentos_funcionario_id_fkey"
            columns: ["funcionario_id"]
            isOneToOne: false
            referencedRelation: "funcionarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "abastecimentos_insumo_id_fkey"
            columns: ["insumo_id"]
            isOneToOne: false
            referencedRelation: "insumos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "abastecimentos_insumo_movimentado_id_fkey"
            columns: ["insumo_movimentado_id"]
            isOneToOne: false
            referencedRelation: "insumos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "abastecimentos_lancado_por_perfil_id_fkey"
            columns: ["lancado_por_perfil_id"]
            isOneToOne: false
            referencedRelation: "perfis"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "abastecimentos_lancamento_id_fkey"
            columns: ["lancamento_id"]
            isOneToOne: false
            referencedRelation: "lancamentos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "abastecimentos_maquina_id_fkey"
            columns: ["maquina_id"]
            isOneToOne: false
            referencedRelation: "maquinas"
            referencedColumns: ["id"]
          },
        ]
      }
      acerto_frete_itens: {
        Row: {
          acerto_id: string
          created_at: string | null
          data_ref: string | null
          descricao: string | null
          id: string
          referencia_id: string | null
          tipo: string
          valor: number
        }
        Insert: {
          acerto_id: string
          created_at?: string | null
          data_ref?: string | null
          descricao?: string | null
          id?: string
          referencia_id?: string | null
          tipo: string
          valor?: number
        }
        Update: {
          acerto_id?: string
          created_at?: string | null
          data_ref?: string | null
          descricao?: string | null
          id?: string
          referencia_id?: string | null
          tipo?: string
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "acerto_frete_itens_acerto_id_fkey"
            columns: ["acerto_id"]
            isOneToOne: false
            referencedRelation: "acertos_frete"
            referencedColumns: ["id"]
          },
        ]
      }
      acertos_frete: {
        Row: {
          created_at: string | null
          fazenda_id: string
          id: string
          lancamento_id: string | null
          motorista_id: string | null
          motorista_nome: string | null
          observacao: string | null
          periodo_ano: number
          periodo_mes: number
          status: string
          updated_at: string | null
          valor_adiantamentos: number | null
          valor_bruto: number | null
          valor_combustivel: number | null
          valor_liquido: number | null
          valor_outros_descontos: number | null
        }
        Insert: {
          created_at?: string | null
          fazenda_id: string
          id?: string
          lancamento_id?: string | null
          motorista_id?: string | null
          motorista_nome?: string | null
          observacao?: string | null
          periodo_ano: number
          periodo_mes: number
          status?: string
          updated_at?: string | null
          valor_adiantamentos?: number | null
          valor_bruto?: number | null
          valor_combustivel?: number | null
          valor_liquido?: number | null
          valor_outros_descontos?: number | null
        }
        Update: {
          created_at?: string | null
          fazenda_id?: string
          id?: string
          lancamento_id?: string | null
          motorista_id?: string | null
          motorista_nome?: string | null
          observacao?: string | null
          periodo_ano?: number
          periodo_mes?: number
          status?: string
          updated_at?: string | null
          valor_adiantamentos?: number | null
          valor_bruto?: number | null
          valor_combustivel?: number | null
          valor_liquido?: number | null
          valor_outros_descontos?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "acertos_frete_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "acertos_frete_motorista_id_fkey"
            columns: ["motorista_id"]
            isOneToOne: false
            referencedRelation: "motoristas"
            referencedColumns: ["id"]
          },
        ]
      }
      adiantamentos_aplicacoes: {
        Row: {
          adiantamento_id: string
          created_at: string | null
          data_aplicacao: string
          descricao: string
          fazenda_id: string
          id: string
          nf_entrada_id: string | null
          nr_nf: string | null
          valor_aplicado: number
        }
        Insert: {
          adiantamento_id: string
          created_at?: string | null
          data_aplicacao: string
          descricao: string
          fazenda_id: string
          id?: string
          nf_entrada_id?: string | null
          nr_nf?: string | null
          valor_aplicado: number
        }
        Update: {
          adiantamento_id?: string
          created_at?: string | null
          data_aplicacao?: string
          descricao?: string
          fazenda_id?: string
          id?: string
          nf_entrada_id?: string | null
          nr_nf?: string | null
          valor_aplicado?: number
        }
        Relationships: [
          {
            foreignKeyName: "adiantamentos_aplicacoes_adiantamento_id_fkey"
            columns: ["adiantamento_id"]
            isOneToOne: false
            referencedRelation: "adiantamentos_fornecedor"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "adiantamentos_aplicacoes_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "adiantamentos_aplicacoes_nf_entrada_id_fkey"
            columns: ["nf_entrada_id"]
            isOneToOne: false
            referencedRelation: "nf_entradas"
            referencedColumns: ["id"]
          },
        ]
      }
      adiantamentos_fornecedor: {
        Row: {
          ano_safra_id: string | null
          conta_bancaria_id: string | null
          cotacao_usd: number | null
          created_at: string | null
          data_emissao: string
          data_previsao: string | null
          descricao: string
          fazenda_id: string
          id: string
          lancamento_id: string | null
          moeda: string
          nr_documento: string | null
          observacao: string | null
          pessoa_id: string | null
          status: string
          valor: number
          valor_aplicado: number
        }
        Insert: {
          ano_safra_id?: string | null
          conta_bancaria_id?: string | null
          cotacao_usd?: number | null
          created_at?: string | null
          data_emissao: string
          data_previsao?: string | null
          descricao: string
          fazenda_id: string
          id?: string
          lancamento_id?: string | null
          moeda?: string
          nr_documento?: string | null
          observacao?: string | null
          pessoa_id?: string | null
          status?: string
          valor: number
          valor_aplicado?: number
        }
        Update: {
          ano_safra_id?: string | null
          conta_bancaria_id?: string | null
          cotacao_usd?: number | null
          created_at?: string | null
          data_emissao?: string
          data_previsao?: string | null
          descricao?: string
          fazenda_id?: string
          id?: string
          lancamento_id?: string | null
          moeda?: string
          nr_documento?: string | null
          observacao?: string | null
          pessoa_id?: string | null
          status?: string
          valor?: number
          valor_aplicado?: number
        }
        Relationships: [
          {
            foreignKeyName: "adiantamentos_fornecedor_ano_safra_id_fkey"
            columns: ["ano_safra_id"]
            isOneToOne: false
            referencedRelation: "anos_safra"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "adiantamentos_fornecedor_conta_bancaria_id_fkey"
            columns: ["conta_bancaria_id"]
            isOneToOne: false
            referencedRelation: "contas_bancarias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "adiantamentos_fornecedor_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "adiantamentos_fornecedor_lancamento_id_fkey"
            columns: ["lancamento_id"]
            isOneToOne: false
            referencedRelation: "lancamentos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "adiantamentos_fornecedor_pessoa_id_fkey"
            columns: ["pessoa_id"]
            isOneToOne: false
            referencedRelation: "pessoas"
            referencedColumns: ["id"]
          },
        ]
      }
      adiantamentos_salario: {
        Row: {
          competencia_ref: string | null
          created_at: string | null
          data: string
          descricao: string | null
          fazenda_id: string
          funcionario_id: string
          id: string
          lancamento_id: string | null
          status: string
          valor: number
        }
        Insert: {
          competencia_ref?: string | null
          created_at?: string | null
          data: string
          descricao?: string | null
          fazenda_id: string
          funcionario_id: string
          id?: string
          lancamento_id?: string | null
          status?: string
          valor: number
        }
        Update: {
          competencia_ref?: string | null
          created_at?: string | null
          data?: string
          descricao?: string | null
          fazenda_id?: string
          funcionario_id?: string
          id?: string
          lancamento_id?: string | null
          status?: string
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "adiantamentos_salario_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "adiantamentos_salario_funcionario_id_fkey"
            columns: ["funcionario_id"]
            isOneToOne: false
            referencedRelation: "funcionarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "adiantamentos_salario_lancamento_id_fkey"
            columns: ["lancamento_id"]
            isOneToOne: false
            referencedRelation: "lancamentos"
            referencedColumns: ["id"]
          },
        ]
      }
      aditivos_contrato: {
        Row: {
          contrato_id: string
          created_at: string | null
          data_aditivo: string
          descricao: string
          fazenda_id: string
          id: string
          nova_data_vencimento: string | null
          nova_taxa_aa: number | null
          nova_taxa_am: number | null
          novo_num_parcelas: number | null
          novo_valor_financiado: number | null
          obs: string | null
          tipo: string
        }
        Insert: {
          contrato_id: string
          created_at?: string | null
          data_aditivo: string
          descricao: string
          fazenda_id: string
          id?: string
          nova_data_vencimento?: string | null
          nova_taxa_aa?: number | null
          nova_taxa_am?: number | null
          novo_num_parcelas?: number | null
          novo_valor_financiado?: number | null
          obs?: string | null
          tipo?: string
        }
        Update: {
          contrato_id?: string
          created_at?: string | null
          data_aditivo?: string
          descricao?: string
          fazenda_id?: string
          id?: string
          nova_data_vencimento?: string | null
          nova_taxa_aa?: number | null
          nova_taxa_am?: number | null
          novo_num_parcelas?: number | null
          novo_valor_financiado?: number | null
          obs?: string | null
          tipo?: string
        }
        Relationships: [
          {
            foreignKeyName: "aditivos_contrato_contrato_id_fkey"
            columns: ["contrato_id"]
            isOneToOne: false
            referencedRelation: "contratos_financeiros"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "aditivos_contrato_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      adubacoes_base: {
        Row: {
          aprovado_em: string | null
          aprovado_por_perfil_id: string | null
          area_ha: number
          ciclo_id: string | null
          created_at: string | null
          custo_total: number | null
          data_aplicacao: string
          fazenda_id: string
          id: string
          lancado_por_perfil_id: string | null
          lancamento_id: string | null
          maquina_id: string | null
          modalidade: string
          motivo_rejeicao: string | null
          observacao: string | null
          origem_lancamento: string
          origem_op_id: string | null
          safra_id: string | null
          status_campo: string
          talhao_id: string | null
        }
        Insert: {
          aprovado_em?: string | null
          aprovado_por_perfil_id?: string | null
          area_ha: number
          ciclo_id?: string | null
          created_at?: string | null
          custo_total?: number | null
          data_aplicacao: string
          fazenda_id: string
          id?: string
          lancado_por_perfil_id?: string | null
          lancamento_id?: string | null
          maquina_id?: string | null
          modalidade?: string
          motivo_rejeicao?: string | null
          observacao?: string | null
          origem_lancamento?: string
          origem_op_id?: string | null
          safra_id?: string | null
          status_campo?: string
          talhao_id?: string | null
        }
        Update: {
          aprovado_em?: string | null
          aprovado_por_perfil_id?: string | null
          area_ha?: number
          ciclo_id?: string | null
          created_at?: string | null
          custo_total?: number | null
          data_aplicacao?: string
          fazenda_id?: string
          id?: string
          lancado_por_perfil_id?: string | null
          lancamento_id?: string | null
          maquina_id?: string | null
          modalidade?: string
          motivo_rejeicao?: string | null
          observacao?: string | null
          origem_lancamento?: string
          origem_op_id?: string | null
          safra_id?: string | null
          status_campo?: string
          talhao_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "adubacoes_base_aprovado_por_perfil_id_fkey"
            columns: ["aprovado_por_perfil_id"]
            isOneToOne: false
            referencedRelation: "perfis"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "adubacoes_base_ciclo_id_fkey"
            columns: ["ciclo_id"]
            isOneToOne: false
            referencedRelation: "ciclos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "adubacoes_base_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "adubacoes_base_lancado_por_perfil_id_fkey"
            columns: ["lancado_por_perfil_id"]
            isOneToOne: false
            referencedRelation: "perfis"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "adubacoes_base_maquina_id_fkey"
            columns: ["maquina_id"]
            isOneToOne: false
            referencedRelation: "maquinas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "adubacoes_base_safra_id_fkey"
            columns: ["safra_id"]
            isOneToOne: false
            referencedRelation: "safras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "adubacoes_base_talhao_id_fkey"
            columns: ["talhao_id"]
            isOneToOne: false
            referencedRelation: "talhoes"
            referencedColumns: ["id"]
          },
        ]
      }
      adubacoes_base_itens: {
        Row: {
          adubacao_id: string
          created_at: string | null
          custo_total: number | null
          dose_kg_ha: number | null
          dose_kg_ha_recomendada: number | null
          fazenda_id: string
          id: string
          insumo_id: string | null
          produto_nome: string | null
          quantidade_kg: number | null
          valor_unitario: number | null
        }
        Insert: {
          adubacao_id: string
          created_at?: string | null
          custo_total?: number | null
          dose_kg_ha?: number | null
          dose_kg_ha_recomendada?: number | null
          fazenda_id: string
          id?: string
          insumo_id?: string | null
          produto_nome?: string | null
          quantidade_kg?: number | null
          valor_unitario?: number | null
        }
        Update: {
          adubacao_id?: string
          created_at?: string | null
          custo_total?: number | null
          dose_kg_ha?: number | null
          dose_kg_ha_recomendada?: number | null
          fazenda_id?: string
          id?: string
          insumo_id?: string | null
          produto_nome?: string | null
          quantidade_kg?: number | null
          valor_unitario?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "adubacoes_base_itens_adubacao_id_fkey"
            columns: ["adubacao_id"]
            isOneToOne: false
            referencedRelation: "adubacoes_base"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "adubacoes_base_itens_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "adubacoes_base_itens_insumo_id_fkey"
            columns: ["insumo_id"]
            isOneToOne: false
            referencedRelation: "insumos"
            referencedColumns: ["id"]
          },
        ]
      }
      algodao_beneficiamentos: {
        Row: {
          algodoeira_id: string | null
          ciclo_id: string
          created_at: string | null
          custo_beneficiamento: number | null
          data_beneficiamento: string | null
          data_entrada: string | null
          fazenda_id: string
          id: string
          num_fardo_final: string | null
          num_fardo_inicial: string | null
          num_fardos: number | null
          num_modulos: number | null
          obs: string | null
          peso_bruto_caroco_kg: number | null
          peso_caroco_retorno_kg: number | null
          peso_pluma_kg: number | null
          rendimento_pluma_pct: number | null
          status: string | null
        }
        Insert: {
          algodoeira_id?: string | null
          ciclo_id: string
          created_at?: string | null
          custo_beneficiamento?: number | null
          data_beneficiamento?: string | null
          data_entrada?: string | null
          fazenda_id: string
          id?: string
          num_fardo_final?: string | null
          num_fardo_inicial?: string | null
          num_fardos?: number | null
          num_modulos?: number | null
          obs?: string | null
          peso_bruto_caroco_kg?: number | null
          peso_caroco_retorno_kg?: number | null
          peso_pluma_kg?: number | null
          rendimento_pluma_pct?: number | null
          status?: string | null
        }
        Update: {
          algodoeira_id?: string | null
          ciclo_id?: string
          created_at?: string | null
          custo_beneficiamento?: number | null
          data_beneficiamento?: string | null
          data_entrada?: string | null
          fazenda_id?: string
          id?: string
          num_fardo_final?: string | null
          num_fardo_inicial?: string | null
          num_fardos?: number | null
          num_modulos?: number | null
          obs?: string | null
          peso_bruto_caroco_kg?: number | null
          peso_caroco_retorno_kg?: number | null
          peso_pluma_kg?: number | null
          rendimento_pluma_pct?: number | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "algodao_beneficiamentos_algodoeira_id_fkey"
            columns: ["algodoeira_id"]
            isOneToOne: false
            referencedRelation: "pessoas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "algodao_beneficiamentos_ciclo_id_fkey"
            columns: ["ciclo_id"]
            isOneToOne: false
            referencedRelation: "ciclos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "algodao_beneficiamentos_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      algodao_laudos_hvi: {
        Row: {
          amarelamento_b: number | null
          arquivo_pdf_url: string | null
          beneficiamento_id: string
          comprimento_uhml_mm: number | null
          created_at: string | null
          elongacao_pct: number | null
          id: string
          impurezas_pct: number | null
          micronaire: number | null
          neps: number | null
          num_fardo_fim: string | null
          num_fardo_inicio: string | null
          num_fardos: number | null
          obs: string | null
          premium_desconto_pct: number | null
          reflectancia_rd: number | null
          resistencia_gtex: number | null
          sfi_pct: number | null
          tipo_classificacao: string | null
          uniformidade_pct: number | null
        }
        Insert: {
          amarelamento_b?: number | null
          arquivo_pdf_url?: string | null
          beneficiamento_id: string
          comprimento_uhml_mm?: number | null
          created_at?: string | null
          elongacao_pct?: number | null
          id?: string
          impurezas_pct?: number | null
          micronaire?: number | null
          neps?: number | null
          num_fardo_fim?: string | null
          num_fardo_inicio?: string | null
          num_fardos?: number | null
          obs?: string | null
          premium_desconto_pct?: number | null
          reflectancia_rd?: number | null
          resistencia_gtex?: number | null
          sfi_pct?: number | null
          tipo_classificacao?: string | null
          uniformidade_pct?: number | null
        }
        Update: {
          amarelamento_b?: number | null
          arquivo_pdf_url?: string | null
          beneficiamento_id?: string
          comprimento_uhml_mm?: number | null
          created_at?: string | null
          elongacao_pct?: number | null
          id?: string
          impurezas_pct?: number | null
          micronaire?: number | null
          neps?: number | null
          num_fardo_fim?: string | null
          num_fardo_inicio?: string | null
          num_fardos?: number | null
          obs?: string | null
          premium_desconto_pct?: number | null
          reflectancia_rd?: number | null
          resistencia_gtex?: number | null
          sfi_pct?: number | null
          tipo_classificacao?: string | null
          uniformidade_pct?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "algodao_laudos_hvi_beneficiamento_id_fkey"
            columns: ["beneficiamento_id"]
            isOneToOne: false
            referencedRelation: "algodao_beneficiamentos"
            referencedColumns: ["id"]
          },
        ]
      }
      algodao_modulos: {
        Row: {
          algodoeira_id: string | null
          ciclo_id: string
          created_at: string | null
          data_colheita: string | null
          data_entrega: string | null
          fazenda_id: string
          id: string
          latitude: number | null
          localizacao_campo: string | null
          longitude: number | null
          numero: number
          obs: string | null
          peso_estimado_kg: number | null
          romaneio_algodoeira: string | null
          status: string | null
          talhao_id: string | null
        }
        Insert: {
          algodoeira_id?: string | null
          ciclo_id: string
          created_at?: string | null
          data_colheita?: string | null
          data_entrega?: string | null
          fazenda_id: string
          id?: string
          latitude?: number | null
          localizacao_campo?: string | null
          longitude?: number | null
          numero: number
          obs?: string | null
          peso_estimado_kg?: number | null
          romaneio_algodoeira?: string | null
          status?: string | null
          talhao_id?: string | null
        }
        Update: {
          algodoeira_id?: string | null
          ciclo_id?: string
          created_at?: string | null
          data_colheita?: string | null
          data_entrega?: string | null
          fazenda_id?: string
          id?: string
          latitude?: number | null
          localizacao_campo?: string | null
          longitude?: number | null
          numero?: number
          obs?: string | null
          peso_estimado_kg?: number | null
          romaneio_algodoeira?: string | null
          status?: string | null
          talhao_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "algodao_modulos_algodoeira_id_fkey"
            columns: ["algodoeira_id"]
            isOneToOne: false
            referencedRelation: "pessoas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "algodao_modulos_ciclo_id_fkey"
            columns: ["ciclo_id"]
            isOneToOne: false
            referencedRelation: "ciclos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "algodao_modulos_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "algodao_modulos_talhao_id_fkey"
            columns: ["talhao_id"]
            isOneToOne: false
            referencedRelation: "talhoes"
            referencedColumns: ["id"]
          },
        ]
      }
      algodao_operacoes_especiais: {
        Row: {
          abertura_macas_pct: number | null
          altura_planta_cm: number | null
          area_ha: number | null
          ciclo_id: string
          created_at: string | null
          data_aplicacao: string
          dose_ha: number | null
          fazenda_id: string
          id: string
          nawf: number | null
          obs: string | null
          produto: string | null
          talhao_id: string | null
          tipo: string
          unidade_dose: string | null
        }
        Insert: {
          abertura_macas_pct?: number | null
          altura_planta_cm?: number | null
          area_ha?: number | null
          ciclo_id: string
          created_at?: string | null
          data_aplicacao: string
          dose_ha?: number | null
          fazenda_id: string
          id?: string
          nawf?: number | null
          obs?: string | null
          produto?: string | null
          talhao_id?: string | null
          tipo: string
          unidade_dose?: string | null
        }
        Update: {
          abertura_macas_pct?: number | null
          altura_planta_cm?: number | null
          area_ha?: number | null
          ciclo_id?: string
          created_at?: string | null
          data_aplicacao?: string
          dose_ha?: number | null
          fazenda_id?: string
          id?: string
          nawf?: number | null
          obs?: string | null
          produto?: string | null
          talhao_id?: string | null
          tipo?: string
          unidade_dose?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "algodao_operacoes_especiais_ciclo_id_fkey"
            columns: ["ciclo_id"]
            isOneToOne: false
            referencedRelation: "ciclos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "algodao_operacoes_especiais_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "algodao_operacoes_especiais_talhao_id_fkey"
            columns: ["talhao_id"]
            isOneToOne: false
            referencedRelation: "talhoes"
            referencedColumns: ["id"]
          },
        ]
      }
      anos_safra: {
        Row: {
          conta_id: string | null
          created_at: string | null
          data_fim: string
          data_inicio: string
          descricao: string
          fazenda_id: string
          id: string
          status: string
        }
        Insert: {
          conta_id?: string | null
          created_at?: string | null
          data_fim: string
          data_inicio: string
          descricao: string
          fazenda_id: string
          id?: string
          status?: string
        }
        Update: {
          conta_id?: string | null
          created_at?: string | null
          data_fim?: string
          data_inicio?: string
          descricao?: string
          fazenda_id?: string
          id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "anos_safra_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "contas"
            referencedColumns: ["id"]
          },
        ]
      }
      aplicacao_movimentos: {
        Row: {
          aplicacao_id: string
          conta_destino: string | null
          conta_origem: string | null
          created_at: string | null
          data: string
          fazenda_id: string
          id: string
          iof: number
          ir: number
          observacao: string | null
          tipo: string
          valor_bruto: number
          valor_liquido: number | null
        }
        Insert: {
          aplicacao_id: string
          conta_destino?: string | null
          conta_origem?: string | null
          created_at?: string | null
          data: string
          fazenda_id: string
          id?: string
          iof?: number
          ir?: number
          observacao?: string | null
          tipo: string
          valor_bruto: number
          valor_liquido?: number | null
        }
        Update: {
          aplicacao_id?: string
          conta_destino?: string | null
          conta_origem?: string | null
          created_at?: string | null
          data?: string
          fazenda_id?: string
          id?: string
          iof?: number
          ir?: number
          observacao?: string | null
          tipo?: string
          valor_bruto?: number
          valor_liquido?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "aplicacao_movimentos_aplicacao_id_fkey"
            columns: ["aplicacao_id"]
            isOneToOne: false
            referencedRelation: "aplicacoes_financeiras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "aplicacao_movimentos_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      aplicacoes_aereas: {
        Row: {
          aeronave_prefixo: string | null
          altura_voo_m: number | null
          area_ha: number
          art_numero: string | null
          ciclo_id: string
          cloa_numero: string | null
          created_at: string | null
          custo_ha: number | null
          custo_total: number | null
          data_aplicacao: string
          direcao_vento: string | null
          empresa_aplicadora_id: string | null
          empresa_nome: string | null
          estadio_fenologico: string | null
          fazenda_id: string
          fiscal: boolean | null
          id: string
          observacao: string | null
          piloto: string | null
          temperatura_c: number | null
          tipo: string
          tipo_aeronave: string
          umidade_rel_pct: number | null
          velocidade_vento_kmh: number | null
          volume_calda_l_ha: number | null
        }
        Insert: {
          aeronave_prefixo?: string | null
          altura_voo_m?: number | null
          area_ha?: number
          art_numero?: string | null
          ciclo_id: string
          cloa_numero?: string | null
          created_at?: string | null
          custo_ha?: number | null
          custo_total?: number | null
          data_aplicacao: string
          direcao_vento?: string | null
          empresa_aplicadora_id?: string | null
          empresa_nome?: string | null
          estadio_fenologico?: string | null
          fazenda_id: string
          fiscal?: boolean | null
          id?: string
          observacao?: string | null
          piloto?: string | null
          temperatura_c?: number | null
          tipo?: string
          tipo_aeronave?: string
          umidade_rel_pct?: number | null
          velocidade_vento_kmh?: number | null
          volume_calda_l_ha?: number | null
        }
        Update: {
          aeronave_prefixo?: string | null
          altura_voo_m?: number | null
          area_ha?: number
          art_numero?: string | null
          ciclo_id?: string
          cloa_numero?: string | null
          created_at?: string | null
          custo_ha?: number | null
          custo_total?: number | null
          data_aplicacao?: string
          direcao_vento?: string | null
          empresa_aplicadora_id?: string | null
          empresa_nome?: string | null
          estadio_fenologico?: string | null
          fazenda_id?: string
          fiscal?: boolean | null
          id?: string
          observacao?: string | null
          piloto?: string | null
          temperatura_c?: number | null
          tipo?: string
          tipo_aeronave?: string
          umidade_rel_pct?: number | null
          velocidade_vento_kmh?: number | null
          volume_calda_l_ha?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "aplicacoes_aereas_ciclo_id_fkey"
            columns: ["ciclo_id"]
            isOneToOne: false
            referencedRelation: "ciclos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "aplicacoes_aereas_empresa_aplicadora_id_fkey"
            columns: ["empresa_aplicadora_id"]
            isOneToOne: false
            referencedRelation: "empresas_aplicadoras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "aplicacoes_aereas_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      aplicacoes_aereas_itens: {
        Row: {
          aplicacao_id: string
          custo_ha: number | null
          custo_total: number | null
          dose_ha: number
          fazenda_id: string
          id: string
          insumo_id: string | null
          nome_produto: string
          total_consumido: number | null
          unidade: string
          valor_unitario: number | null
        }
        Insert: {
          aplicacao_id: string
          custo_ha?: number | null
          custo_total?: number | null
          dose_ha?: number
          fazenda_id: string
          id?: string
          insumo_id?: string | null
          nome_produto: string
          total_consumido?: number | null
          unidade?: string
          valor_unitario?: number | null
        }
        Update: {
          aplicacao_id?: string
          custo_ha?: number | null
          custo_total?: number | null
          dose_ha?: number
          fazenda_id?: string
          id?: string
          insumo_id?: string | null
          nome_produto?: string
          total_consumido?: number | null
          unidade?: string
          valor_unitario?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "aplicacoes_aereas_itens_aplicacao_id_fkey"
            columns: ["aplicacao_id"]
            isOneToOne: false
            referencedRelation: "aplicacoes_aereas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "aplicacoes_aereas_itens_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "aplicacoes_aereas_itens_insumo_id_fkey"
            columns: ["insumo_id"]
            isOneToOne: false
            referencedRelation: "insumos"
            referencedColumns: ["id"]
          },
        ]
      }
      aplicacoes_aereas_talhoes: {
        Row: {
          aplicacao_id: string
          area_ha: number | null
          id: string
          talhao_id: string
        }
        Insert: {
          aplicacao_id: string
          area_ha?: number | null
          id?: string
          talhao_id: string
        }
        Update: {
          aplicacao_id?: string
          area_ha?: number | null
          id?: string
          talhao_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "aplicacoes_aereas_talhoes_aplicacao_id_fkey"
            columns: ["aplicacao_id"]
            isOneToOne: false
            referencedRelation: "aplicacoes_aereas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "aplicacoes_aereas_talhoes_talhao_id_fkey"
            columns: ["talhao_id"]
            isOneToOne: false
            referencedRelation: "talhoes"
            referencedColumns: ["id"]
          },
        ]
      }
      aplicacoes_financeiras: {
        Row: {
          conta_aplicacao: string | null
          conta_corrente: string | null
          created_at: string | null
          data_inicio: string
          data_vencimento: string | null
          fazenda_id: string
          id: string
          indexador: string | null
          instituicao: string | null
          nome: string
          observacao: string | null
          rendimentos_brutos: number
          status: string
          taxa_contratada: number | null
          tipo: string
          valor_aportado: number
          valor_atual: number
        }
        Insert: {
          conta_aplicacao?: string | null
          conta_corrente?: string | null
          created_at?: string | null
          data_inicio: string
          data_vencimento?: string | null
          fazenda_id: string
          id?: string
          indexador?: string | null
          instituicao?: string | null
          nome: string
          observacao?: string | null
          rendimentos_brutos?: number
          status?: string
          taxa_contratada?: number | null
          tipo: string
          valor_aportado?: number
          valor_atual?: number
        }
        Update: {
          conta_aplicacao?: string | null
          conta_corrente?: string | null
          created_at?: string | null
          data_inicio?: string
          data_vencimento?: string | null
          fazenda_id?: string
          id?: string
          indexador?: string | null
          instituicao?: string | null
          nome?: string
          observacao?: string | null
          rendimentos_brutos?: number
          status?: string
          taxa_contratada?: number | null
          tipo?: string
          valor_aportado?: number
          valor_atual?: number
        }
        Relationships: [
          {
            foreignKeyName: "aplicacoes_financeiras_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      apoio_baixas: {
        Row: {
          conta_bancaria_id: string | null
          created_at: string | null
          data_baixa: string
          fazenda_id: string
          id: string
          lancamento_id: string
          observacao: string | null
        }
        Insert: {
          conta_bancaria_id?: string | null
          created_at?: string | null
          data_baixa?: string
          fazenda_id: string
          id?: string
          lancamento_id: string
          observacao?: string | null
        }
        Update: {
          conta_bancaria_id?: string | null
          created_at?: string | null
          data_baixa?: string
          fazenda_id?: string
          id?: string
          lancamento_id?: string
          observacao?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "apoio_baixas_conta_bancaria_id_fkey"
            columns: ["conta_bancaria_id"]
            isOneToOne: false
            referencedRelation: "contas_bancarias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "apoio_baixas_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "apoio_baixas_lancamento_id_fkey"
            columns: ["lancamento_id"]
            isOneToOne: true
            referencedRelation: "lancamentos"
            referencedColumns: ["id"]
          },
        ]
      }
      apoio_lancamentos: {
        Row: {
          ano_safra_id: string | null
          baixado: boolean
          categoria: string | null
          ciclo_id: string | null
          created_at: string | null
          data_baixa: string | null
          data_lancamento: string | null
          data_vencimento: string
          descricao: string
          fazenda_id: string
          id: string
          moeda: string
          num_parcela: number | null
          numero_documento: string | null
          observacao: string | null
          operacao_gerencial_id: string | null
          origem: string | null
          pessoa_id: string | null
          pessoa_nome: string | null
          produtor_id: string | null
          produtor_nome: string | null
          safra_nome: string | null
          tipo: string
          tipo_documento_lcdpr: string | null
          total_parcelas: number | null
          valor: number
        }
        Insert: {
          ano_safra_id?: string | null
          baixado?: boolean
          categoria?: string | null
          ciclo_id?: string | null
          created_at?: string | null
          data_baixa?: string | null
          data_lancamento?: string | null
          data_vencimento: string
          descricao: string
          fazenda_id: string
          id?: string
          moeda?: string
          num_parcela?: number | null
          numero_documento?: string | null
          observacao?: string | null
          operacao_gerencial_id?: string | null
          origem?: string | null
          pessoa_id?: string | null
          pessoa_nome?: string | null
          produtor_id?: string | null
          produtor_nome?: string | null
          safra_nome?: string | null
          tipo: string
          tipo_documento_lcdpr?: string | null
          total_parcelas?: number | null
          valor?: number
        }
        Update: {
          ano_safra_id?: string | null
          baixado?: boolean
          categoria?: string | null
          ciclo_id?: string | null
          created_at?: string | null
          data_baixa?: string | null
          data_lancamento?: string | null
          data_vencimento?: string
          descricao?: string
          fazenda_id?: string
          id?: string
          moeda?: string
          num_parcela?: number | null
          numero_documento?: string | null
          observacao?: string | null
          operacao_gerencial_id?: string | null
          origem?: string | null
          pessoa_id?: string | null
          pessoa_nome?: string | null
          produtor_id?: string | null
          produtor_nome?: string | null
          safra_nome?: string | null
          tipo?: string
          tipo_documento_lcdpr?: string | null
          total_parcelas?: number | null
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "apoio_lancamentos_ano_safra_id_fkey"
            columns: ["ano_safra_id"]
            isOneToOne: false
            referencedRelation: "anos_safra"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "apoio_lancamentos_ciclo_id_fkey"
            columns: ["ciclo_id"]
            isOneToOne: false
            referencedRelation: "ciclos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "apoio_lancamentos_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "apoio_lancamentos_operacao_gerencial_id_fkey"
            columns: ["operacao_gerencial_id"]
            isOneToOne: false
            referencedRelation: "operacoes_gerenciais"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "apoio_lancamentos_pessoa_id_fkey"
            columns: ["pessoa_id"]
            isOneToOne: false
            referencedRelation: "pessoas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "apoio_lancamentos_produtor_id_fkey"
            columns: ["produtor_id"]
            isOneToOne: false
            referencedRelation: "produtores"
            referencedColumns: ["id"]
          },
        ]
      }
      apolices_seguro: {
        Row: {
          area_ha: number | null
          arquivo_url: string | null
          bem_id: string | null
          bem_tipo: string | null
          coberturas_vida: Json | null
          conta_id: string | null
          corretor_contato: string | null
          corretora: string | null
          created_at: string | null
          cultura: string | null
          data_fim_vigencia: string
          data_inicio_vigencia: string
          fazenda_id: string
          forma_pagamento_premio: string
          id: string
          importancia_segurada: number
          modalidade_seguro: string | null
          numero_apolice: string
          objeto_segurado: string
          observacao: string | null
          premio_anual: number
          produtividade_garantida_pct: number | null
          ramo: string
          seguradora: string
          status: string
          valor_referencia_sc: number | null
        }
        Insert: {
          area_ha?: number | null
          arquivo_url?: string | null
          bem_id?: string | null
          bem_tipo?: string | null
          coberturas_vida?: Json | null
          conta_id?: string | null
          corretor_contato?: string | null
          corretora?: string | null
          created_at?: string | null
          cultura?: string | null
          data_fim_vigencia: string
          data_inicio_vigencia: string
          fazenda_id: string
          forma_pagamento_premio?: string
          id?: string
          importancia_segurada?: number
          modalidade_seguro?: string | null
          numero_apolice: string
          objeto_segurado?: string
          observacao?: string | null
          premio_anual?: number
          produtividade_garantida_pct?: number | null
          ramo?: string
          seguradora: string
          status?: string
          valor_referencia_sc?: number | null
        }
        Update: {
          area_ha?: number | null
          arquivo_url?: string | null
          bem_id?: string | null
          bem_tipo?: string | null
          coberturas_vida?: Json | null
          conta_id?: string | null
          corretor_contato?: string | null
          corretora?: string | null
          created_at?: string | null
          cultura?: string | null
          data_fim_vigencia?: string
          data_inicio_vigencia?: string
          fazenda_id?: string
          forma_pagamento_premio?: string
          id?: string
          importancia_segurada?: number
          modalidade_seguro?: string | null
          numero_apolice?: string
          objeto_segurado?: string
          observacao?: string | null
          premio_anual?: number
          produtividade_garantida_pct?: number | null
          ramo?: string
          seguradora?: string
          status?: string
          valor_referencia_sc?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "apolices_seguro_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "contas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "apolices_seguro_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      arrendamento_matriculas: {
        Row: {
          area_ha: number | null
          arrendamento_id: string | null
          cartorio: string | null
          created_at: string | null
          fazenda_id: string | null
          id: string
          numero: string
        }
        Insert: {
          area_ha?: number | null
          arrendamento_id?: string | null
          cartorio?: string | null
          created_at?: string | null
          fazenda_id?: string | null
          id?: string
          numero: string
        }
        Update: {
          area_ha?: number | null
          arrendamento_id?: string | null
          cartorio?: string | null
          created_at?: string | null
          fazenda_id?: string | null
          id?: string
          numero?: string
        }
        Relationships: [
          {
            foreignKeyName: "arrendamento_matriculas_arrendamento_id_fkey"
            columns: ["arrendamento_id"]
            isOneToOne: false
            referencedRelation: "arrendamentos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "arrendamento_matriculas_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      arrendamento_pagamentos: {
        Row: {
          ano_safra_id: string | null
          arrendamento_id: string
          commodity: string | null
          created_at: string | null
          data_pagamento: string | null
          data_vencimento: string
          fazenda_id: string
          id: string
          lancamento_id: string | null
          observacao: string | null
          preco_sc_referencia: number | null
          sacas_pagas: number | null
          sacas_previstas: number | null
          status: string
          valor_pago: number | null
          valor_previsto: number | null
        }
        Insert: {
          ano_safra_id?: string | null
          arrendamento_id: string
          commodity?: string | null
          created_at?: string | null
          data_pagamento?: string | null
          data_vencimento: string
          fazenda_id: string
          id?: string
          lancamento_id?: string | null
          observacao?: string | null
          preco_sc_referencia?: number | null
          sacas_pagas?: number | null
          sacas_previstas?: number | null
          status?: string
          valor_pago?: number | null
          valor_previsto?: number | null
        }
        Update: {
          ano_safra_id?: string | null
          arrendamento_id?: string
          commodity?: string | null
          created_at?: string | null
          data_pagamento?: string | null
          data_vencimento?: string
          fazenda_id?: string
          id?: string
          lancamento_id?: string | null
          observacao?: string | null
          preco_sc_referencia?: number | null
          sacas_pagas?: number | null
          sacas_previstas?: number | null
          status?: string
          valor_pago?: number | null
          valor_previsto?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "arrendamento_pagamentos_ano_safra_id_fkey"
            columns: ["ano_safra_id"]
            isOneToOne: false
            referencedRelation: "anos_safra"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "arrendamento_pagamentos_arrendamento_id_fkey"
            columns: ["arrendamento_id"]
            isOneToOne: false
            referencedRelation: "arrendamentos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "arrendamento_pagamentos_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      arrendamentos: {
        Row: {
          ano_safra_id: string | null
          area_ha: number
          created_at: string | null
          fazenda_id: string | null
          forma_pagamento: string
          id: string
          ie_id: string | null
          inicio: string | null
          locatario_id: string | null
          locatario_nome: string | null
          observacao: string | null
          produto_agricola_id: string | null
          produto_agricola_id_milho: string | null
          produtor_id: string | null
          produtor_id_2: string | null
          proprietario_id: string | null
          proprietario_nome: string | null
          renovacao_auto: boolean | null
          sc_ha: number | null
          sc_milho_ha: number | null
          valor_brl: number | null
          vencimento: string | null
        }
        Insert: {
          ano_safra_id?: string | null
          area_ha: number
          created_at?: string | null
          fazenda_id?: string | null
          forma_pagamento: string
          id?: string
          ie_id?: string | null
          inicio?: string | null
          locatario_id?: string | null
          locatario_nome?: string | null
          observacao?: string | null
          produto_agricola_id?: string | null
          produto_agricola_id_milho?: string | null
          produtor_id?: string | null
          produtor_id_2?: string | null
          proprietario_id?: string | null
          proprietario_nome?: string | null
          renovacao_auto?: boolean | null
          sc_ha?: number | null
          sc_milho_ha?: number | null
          valor_brl?: number | null
          vencimento?: string | null
        }
        Update: {
          ano_safra_id?: string | null
          area_ha?: number
          created_at?: string | null
          fazenda_id?: string | null
          forma_pagamento?: string
          id?: string
          ie_id?: string | null
          inicio?: string | null
          locatario_id?: string | null
          locatario_nome?: string | null
          observacao?: string | null
          produto_agricola_id?: string | null
          produto_agricola_id_milho?: string | null
          produtor_id?: string | null
          produtor_id_2?: string | null
          proprietario_id?: string | null
          proprietario_nome?: string | null
          renovacao_auto?: boolean | null
          sc_ha?: number | null
          sc_milho_ha?: number | null
          valor_brl?: number | null
          vencimento?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "arrendamentos_ano_safra_id_fkey"
            columns: ["ano_safra_id"]
            isOneToOne: false
            referencedRelation: "anos_safra"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "arrendamentos_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "arrendamentos_ie_id_fkey"
            columns: ["ie_id"]
            isOneToOne: false
            referencedRelation: "produtor_inscricoes_estaduais"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "arrendamentos_locatario_id_fkey"
            columns: ["locatario_id"]
            isOneToOne: false
            referencedRelation: "pessoas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "arrendamentos_produto_agricola_id_fkey"
            columns: ["produto_agricola_id"]
            isOneToOne: false
            referencedRelation: "insumos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "arrendamentos_produto_agricola_id_milho_fkey"
            columns: ["produto_agricola_id_milho"]
            isOneToOne: false
            referencedRelation: "insumos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "arrendamentos_produtor_id_2_fkey"
            columns: ["produtor_id_2"]
            isOneToOne: false
            referencedRelation: "produtores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "arrendamentos_produtor_id_fkey"
            columns: ["produtor_id"]
            isOneToOne: false
            referencedRelation: "produtores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "arrendamentos_proprietario_id_fkey"
            columns: ["proprietario_id"]
            isOneToOne: false
            referencedRelation: "pessoas"
            referencedColumns: ["id"]
          },
        ]
      }
      assinaturas: {
        Row: {
          asaas_customer_id: string | null
          asaas_subscription_id: string | null
          cancelamento_motivo: string | null
          conta_id: string
          created_at: string | null
          data_inicio: string
          data_proximo_pagamento: string | null
          data_vencimento: string | null
          id: string
          obs: string | null
          periodo: string
          plano_id: string
          preco: number
          status: string
          trial_fim: string | null
          updated_at: string | null
        }
        Insert: {
          asaas_customer_id?: string | null
          asaas_subscription_id?: string | null
          cancelamento_motivo?: string | null
          conta_id: string
          created_at?: string | null
          data_inicio?: string
          data_proximo_pagamento?: string | null
          data_vencimento?: string | null
          id?: string
          obs?: string | null
          periodo?: string
          plano_id: string
          preco: number
          status?: string
          trial_fim?: string | null
          updated_at?: string | null
        }
        Update: {
          asaas_customer_id?: string | null
          asaas_subscription_id?: string | null
          cancelamento_motivo?: string | null
          conta_id?: string
          created_at?: string | null
          data_inicio?: string
          data_proximo_pagamento?: string | null
          data_vencimento?: string | null
          id?: string
          obs?: string | null
          periodo?: string
          plano_id?: string
          preco?: number
          status?: string
          trial_fim?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assinaturas_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "contas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assinaturas_plano_id_fkey"
            columns: ["plano_id"]
            isOneToOne: false
            referencedRelation: "planos"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_log: {
        Row: {
          acao: string
          campos_alterados: string[] | null
          created_at: string | null
          dados_antes: Json | null
          dados_depois: Json | null
          fazenda_id: string | null
          id: string
          registro_id: string | null
          tabela: string
          usuario_app: string | null
        }
        Insert: {
          acao: string
          campos_alterados?: string[] | null
          created_at?: string | null
          dados_antes?: Json | null
          dados_depois?: Json | null
          fazenda_id?: string | null
          id?: string
          registro_id?: string | null
          tabela: string
          usuario_app?: string | null
        }
        Update: {
          acao?: string
          campos_alterados?: string[] | null
          created_at?: string | null
          dados_antes?: Json | null
          dados_depois?: Json | null
          fazenda_id?: string | null
          id?: string
          registro_id?: string | null
          tabela?: string
          usuario_app?: string | null
        }
        Relationships: []
      }
      bancos: {
        Row: {
          ativo: boolean
          cnpj: string
          codigo_compe: string
          id: string
          ispb: string | null
          nome: string
          nome_curto: string
        }
        Insert: {
          ativo?: boolean
          cnpj: string
          codigo_compe: string
          id?: string
          ispb?: string | null
          nome: string
          nome_curto: string
        }
        Update: {
          ativo?: boolean
          cnpj?: string
          codigo_compe?: string
          id?: string
          ispb?: string | null
          nome?: string
          nome_curto?: string
        }
        Relationships: []
      }
      barter_compromissos: {
        Row: {
          ano_safra_id: string | null
          ciclo_id: string | null
          commodity: string
          conta_id: string | null
          created_at: string
          data_entrega: string
          data_entrega_realizada: string | null
          descricao: string
          fazenda_id: string
          fornecedor_id: string | null
          id: string
          observacao: string | null
          preco_sc_ref: number | null
          sacas_entregues: number
          sacas_total: number
          status: string
          updated_at: string
          valor_insumos: number | null
        }
        Insert: {
          ano_safra_id?: string | null
          ciclo_id?: string | null
          commodity: string
          conta_id?: string | null
          created_at?: string
          data_entrega: string
          data_entrega_realizada?: string | null
          descricao: string
          fazenda_id: string
          fornecedor_id?: string | null
          id?: string
          observacao?: string | null
          preco_sc_ref?: number | null
          sacas_entregues?: number
          sacas_total: number
          status?: string
          updated_at?: string
          valor_insumos?: number | null
        }
        Update: {
          ano_safra_id?: string | null
          ciclo_id?: string | null
          commodity?: string
          conta_id?: string | null
          created_at?: string
          data_entrega?: string
          data_entrega_realizada?: string | null
          descricao?: string
          fazenda_id?: string
          fornecedor_id?: string | null
          id?: string
          observacao?: string | null
          preco_sc_ref?: number | null
          sacas_entregues?: number
          sacas_total?: number
          status?: string
          updated_at?: string
          valor_insumos?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "barter_compromissos_ano_safra_id_fkey"
            columns: ["ano_safra_id"]
            isOneToOne: false
            referencedRelation: "anos_safra"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "barter_compromissos_ciclo_id_fkey"
            columns: ["ciclo_id"]
            isOneToOne: false
            referencedRelation: "ciclos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "barter_compromissos_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "contas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "barter_compromissos_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "barter_compromissos_fornecedor_id_fkey"
            columns: ["fornecedor_id"]
            isOneToOne: false
            referencedRelation: "pessoas"
            referencedColumns: ["id"]
          },
        ]
      }
      bem_consorcios: {
        Row: {
          bem_id: string
          consorcio_id: string
          id: string
        }
        Insert: {
          bem_id: string
          consorcio_id: string
          id?: string
        }
        Update: {
          bem_id?: string
          consorcio_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bem_consorcios_bem_id_fkey"
            columns: ["bem_id"]
            isOneToOne: false
            referencedRelation: "bens"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bem_consorcios_consorcio_id_fkey"
            columns: ["consorcio_id"]
            isOneToOne: false
            referencedRelation: "consorcios"
            referencedColumns: ["id"]
          },
        ]
      }
      benfeitorias: {
        Row: {
          ano_construcao: number | null
          area_m2: number | null
          ativa: boolean
          created_at: string
          descricao: string | null
          fazenda_id: string
          id: string
          localizacao: string | null
          nome: string
          tipo: string
          valor_aquisicao: number | null
          valor_atual: number | null
          vida_util_anos: number | null
        }
        Insert: {
          ano_construcao?: number | null
          area_m2?: number | null
          ativa?: boolean
          created_at?: string
          descricao?: string | null
          fazenda_id: string
          id?: string
          localizacao?: string | null
          nome: string
          tipo: string
          valor_aquisicao?: number | null
          valor_atual?: number | null
          vida_util_anos?: number | null
        }
        Update: {
          ano_construcao?: number | null
          area_m2?: number | null
          ativa?: boolean
          created_at?: string
          descricao?: string | null
          fazenda_id?: string
          id?: string
          localizacao?: string | null
          nome?: string
          tipo?: string
          valor_aquisicao?: number | null
          valor_atual?: number | null
          vida_util_anos?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "benfeitorias_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      bens: {
        Row: {
          ano_fabricacao: number | null
          area_ha: number | null
          ativo: boolean | null
          cartorio: string | null
          chassi: string | null
          conta_id: string | null
          created_at: string | null
          data_aquisicao: string | null
          descricao: string
          estado: string | null
          fazenda_id: string | null
          id: string
          maquina_id: string | null
          marca: string | null
          matricula_imovel: string | null
          modelo: string | null
          municipio: string | null
          numero_serie: string | null
          observacao: string | null
          placa: string | null
          tipo: string
          valor_aquisicao: number | null
          valor_mercado: number | null
        }
        Insert: {
          ano_fabricacao?: number | null
          area_ha?: number | null
          ativo?: boolean | null
          cartorio?: string | null
          chassi?: string | null
          conta_id?: string | null
          created_at?: string | null
          data_aquisicao?: string | null
          descricao: string
          estado?: string | null
          fazenda_id?: string | null
          id?: string
          maquina_id?: string | null
          marca?: string | null
          matricula_imovel?: string | null
          modelo?: string | null
          municipio?: string | null
          numero_serie?: string | null
          observacao?: string | null
          placa?: string | null
          tipo: string
          valor_aquisicao?: number | null
          valor_mercado?: number | null
        }
        Update: {
          ano_fabricacao?: number | null
          area_ha?: number | null
          ativo?: boolean | null
          cartorio?: string | null
          chassi?: string | null
          conta_id?: string | null
          created_at?: string | null
          data_aquisicao?: string | null
          descricao?: string
          estado?: string | null
          fazenda_id?: string | null
          id?: string
          maquina_id?: string | null
          marca?: string | null
          matricula_imovel?: string | null
          modelo?: string | null
          municipio?: string | null
          numero_serie?: string | null
          observacao?: string | null
          placa?: string | null
          tipo?: string
          valor_aquisicao?: number | null
          valor_mercado?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "bens_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "contas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bens_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bens_maquina_id_fkey"
            columns: ["maquina_id"]
            isOneToOne: false
            referencedRelation: "maquinas"
            referencedColumns: ["id"]
          },
        ]
      }
      bicudo_armadilhas: {
        Row: {
          ativa: boolean | null
          ciclo_id: string | null
          created_at: string | null
          data_instalacao: string | null
          fazenda_id: string
          id: string
          latitude: number | null
          longitude: number | null
          nome: string
          obs: string | null
          talhao_id: string | null
        }
        Insert: {
          ativa?: boolean | null
          ciclo_id?: string | null
          created_at?: string | null
          data_instalacao?: string | null
          fazenda_id: string
          id?: string
          latitude?: number | null
          longitude?: number | null
          nome: string
          obs?: string | null
          talhao_id?: string | null
        }
        Update: {
          ativa?: boolean | null
          ciclo_id?: string | null
          created_at?: string | null
          data_instalacao?: string | null
          fazenda_id?: string
          id?: string
          latitude?: number | null
          longitude?: number | null
          nome?: string
          obs?: string | null
          talhao_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bicudo_armadilhas_ciclo_id_fkey"
            columns: ["ciclo_id"]
            isOneToOne: false
            referencedRelation: "ciclos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bicudo_armadilhas_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bicudo_armadilhas_talhao_id_fkey"
            columns: ["talhao_id"]
            isOneToOne: false
            referencedRelation: "talhoes"
            referencedColumns: ["id"]
          },
        ]
      }
      bicudo_capturas: {
        Row: {
          armadilha_id: string
          capturas: number
          created_at: string | null
          data_leitura: string
          id: string
          obs: string | null
        }
        Insert: {
          armadilha_id: string
          capturas?: number
          created_at?: string | null
          data_leitura: string
          id?: string
          obs?: string | null
        }
        Update: {
          armadilha_id?: string
          capturas?: number
          created_at?: string | null
          data_leitura?: string
          id?: string
          obs?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bicudo_capturas_armadilha_id_fkey"
            columns: ["armadilha_id"]
            isOneToOne: false
            referencedRelation: "bicudo_armadilhas"
            referencedColumns: ["id"]
          },
        ]
      }
      bombas_combustivel: {
        Row: {
          ativa: boolean
          capacidade_l: number | null
          combustivel: string
          consume_estoque: boolean | null
          created_at: string | null
          estoque_atual_l: number
          fazenda_id: string
          id: string
          insumo_id: string | null
          nome: string
        }
        Insert: {
          ativa?: boolean
          capacidade_l?: number | null
          combustivel: string
          consume_estoque?: boolean | null
          created_at?: string | null
          estoque_atual_l?: number
          fazenda_id: string
          id?: string
          insumo_id?: string | null
          nome: string
        }
        Update: {
          ativa?: boolean
          capacidade_l?: number | null
          combustivel?: string
          consume_estoque?: boolean | null
          created_at?: string | null
          estoque_atual_l?: number
          fazenda_id?: string
          id?: string
          insumo_id?: string | null
          nome?: string
        }
        Relationships: [
          {
            foreignKeyName: "bombas_combustivel_insumo_id_fkey"
            columns: ["insumo_id"]
            isOneToOne: false
            referencedRelation: "insumos"
            referencedColumns: ["id"]
          },
        ]
      }
      car_matriculas: {
        Row: {
          car_id: string
          matricula_id: string
        }
        Insert: {
          car_id: string
          matricula_id: string
        }
        Update: {
          car_id?: string
          matricula_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "car_matriculas_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "fazenda_cars"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "car_matriculas_matricula_id_fkey"
            columns: ["matricula_id"]
            isOneToOne: false
            referencedRelation: "matriculas_imoveis"
            referencedColumns: ["id"]
          },
        ]
      }
      cargas_expedicao: {
        Row: {
          avariados_pct: number | null
          contrato_id: string | null
          contrato_numero: string | null
          created_at: string | null
          data_entrega: string | null
          data_saida: string | null
          deposito_destino: string | null
          destino_nome: string | null
          destino_razao_social: string | null
          divergencia_kg: number | null
          fazenda_id: string
          id: string
          impureza_pct: number | null
          mdfe_chave: string | null
          mdfe_id: string | null
          mdfe_numero: string | null
          mdfe_status: string | null
          modalidade_frete: string | null
          motorista_id: string | null
          nfe_chave: string | null
          nfe_complementar_chave: string | null
          nfe_complementar_numero: string | null
          nfe_complementar_status: string | null
          nfe_numero: string | null
          nfe_serie: string | null
          nfe_status: string | null
          nfe_tipo: string | null
          numero: string | null
          observacao: string | null
          peso_aproximado: boolean | null
          peso_aproximado_kg: number | null
          peso_bruto_kg: number | null
          peso_bruto_origem_kg: number | null
          peso_destino_kg: number | null
          peso_liquido_destino_kg: number | null
          peso_liquido_kg: number | null
          placa_carreta: string | null
          produto: string | null
          produtor_id: string | null
          rota: string
          safra: string | null
          status: string | null
          tara_kg: number | null
          tara_origem_kg: number | null
          transportadora_id: string | null
          umidade_pct: number | null
          veiculo_id: string | null
        }
        Insert: {
          avariados_pct?: number | null
          contrato_id?: string | null
          contrato_numero?: string | null
          created_at?: string | null
          data_entrega?: string | null
          data_saida?: string | null
          deposito_destino?: string | null
          destino_nome?: string | null
          destino_razao_social?: string | null
          divergencia_kg?: number | null
          fazenda_id: string
          id?: string
          impureza_pct?: number | null
          mdfe_chave?: string | null
          mdfe_id?: string | null
          mdfe_numero?: string | null
          mdfe_status?: string | null
          modalidade_frete?: string | null
          motorista_id?: string | null
          nfe_chave?: string | null
          nfe_complementar_chave?: string | null
          nfe_complementar_numero?: string | null
          nfe_complementar_status?: string | null
          nfe_numero?: string | null
          nfe_serie?: string | null
          nfe_status?: string | null
          nfe_tipo?: string | null
          numero?: string | null
          observacao?: string | null
          peso_aproximado?: boolean | null
          peso_aproximado_kg?: number | null
          peso_bruto_kg?: number | null
          peso_bruto_origem_kg?: number | null
          peso_destino_kg?: number | null
          peso_liquido_destino_kg?: number | null
          peso_liquido_kg?: number | null
          placa_carreta?: string | null
          produto?: string | null
          produtor_id?: string | null
          rota: string
          safra?: string | null
          status?: string | null
          tara_kg?: number | null
          tara_origem_kg?: number | null
          transportadora_id?: string | null
          umidade_pct?: number | null
          veiculo_id?: string | null
        }
        Update: {
          avariados_pct?: number | null
          contrato_id?: string | null
          contrato_numero?: string | null
          created_at?: string | null
          data_entrega?: string | null
          data_saida?: string | null
          deposito_destino?: string | null
          destino_nome?: string | null
          destino_razao_social?: string | null
          divergencia_kg?: number | null
          fazenda_id?: string
          id?: string
          impureza_pct?: number | null
          mdfe_chave?: string | null
          mdfe_id?: string | null
          mdfe_numero?: string | null
          mdfe_status?: string | null
          modalidade_frete?: string | null
          motorista_id?: string | null
          nfe_chave?: string | null
          nfe_complementar_chave?: string | null
          nfe_complementar_numero?: string | null
          nfe_complementar_status?: string | null
          nfe_numero?: string | null
          nfe_serie?: string | null
          nfe_status?: string | null
          nfe_tipo?: string | null
          numero?: string | null
          observacao?: string | null
          peso_aproximado?: boolean | null
          peso_aproximado_kg?: number | null
          peso_bruto_kg?: number | null
          peso_bruto_origem_kg?: number | null
          peso_destino_kg?: number | null
          peso_liquido_destino_kg?: number | null
          peso_liquido_kg?: number | null
          placa_carreta?: string | null
          produto?: string | null
          produtor_id?: string | null
          rota?: string
          safra?: string | null
          status?: string | null
          tara_kg?: number | null
          tara_origem_kg?: number | null
          transportadora_id?: string | null
          umidade_pct?: number | null
          veiculo_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cargas_expedicao_contrato_id_fkey"
            columns: ["contrato_id"]
            isOneToOne: false
            referencedRelation: "contratos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cargas_expedicao_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cargas_expedicao_motorista_id_fkey"
            columns: ["motorista_id"]
            isOneToOne: false
            referencedRelation: "motoristas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cargas_expedicao_produtor_id_fkey"
            columns: ["produtor_id"]
            isOneToOne: false
            referencedRelation: "produtores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cargas_expedicao_transportadora_id_fkey"
            columns: ["transportadora_id"]
            isOneToOne: false
            referencedRelation: "transportadoras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cargas_expedicao_veiculo_id_fkey"
            columns: ["veiculo_id"]
            isOneToOne: false
            referencedRelation: "veiculos"
            referencedColumns: ["id"]
          },
        ]
      }
      cartoes_credito: {
        Row: {
          ativo: boolean
          banco: string | null
          bandeira: string
          conta_id: string | null
          created_at: string
          dia_fechamento: number
          dia_vencimento: number
          fazenda_id: string | null
          id: string
          limite: number | null
          numero_final: string | null
          observacao: string | null
          titular: string
        }
        Insert: {
          ativo?: boolean
          banco?: string | null
          bandeira?: string
          conta_id?: string | null
          created_at?: string
          dia_fechamento?: number
          dia_vencimento?: number
          fazenda_id?: string | null
          id?: string
          limite?: number | null
          numero_final?: string | null
          observacao?: string | null
          titular: string
        }
        Update: {
          ativo?: boolean
          banco?: string | null
          bandeira?: string
          conta_id?: string | null
          created_at?: string
          dia_fechamento?: number
          dia_vencimento?: number
          fazenda_id?: string | null
          id?: string
          limite?: number | null
          numero_final?: string | null
          observacao?: string | null
          titular?: string
        }
        Relationships: [
          {
            foreignKeyName: "cartoes_credito_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "contas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cartoes_credito_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      categorias_lancamento: {
        Row: {
          created_at: string | null
          fazenda_id: string | null
          id: string
          nome: string
          tipo: string
        }
        Insert: {
          created_at?: string | null
          fazenda_id?: string | null
          id?: string
          nome: string
          tipo: string
        }
        Update: {
          created_at?: string | null
          fazenda_id?: string | null
          id?: string
          nome?: string
          tipo?: string
        }
        Relationships: [
          {
            foreignKeyName: "categorias_lancamento_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      ccir_matriculas: {
        Row: {
          ccir_id: string
          matricula_id: string
        }
        Insert: {
          ccir_id: string
          matricula_id: string
        }
        Update: {
          ccir_id?: string
          matricula_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ccir_matriculas_ccir_id_fkey"
            columns: ["ccir_id"]
            isOneToOne: false
            referencedRelation: "fazenda_ccirs"
            referencedColumns: ["id"]
          },
        ]
      }
      cct_pagamentos: {
        Row: {
          ano_safra_id: string | null
          ciclo_id: string | null
          contrato_id: string
          created_at: string
          data_pagamento: string | null
          data_vencimento: string
          fazenda_id: string | null
          id: string
          lancamento_id: string | null
          moeda_parcela: string | null
          observacao: string | null
          preco_sc_ref: number | null
          produto: string | null
          quantidade_sacas: number | null
          status: string
          valor: number
        }
        Insert: {
          ano_safra_id?: string | null
          ciclo_id?: string | null
          contrato_id: string
          created_at?: string
          data_pagamento?: string | null
          data_vencimento: string
          fazenda_id?: string | null
          id?: string
          lancamento_id?: string | null
          moeda_parcela?: string | null
          observacao?: string | null
          preco_sc_ref?: number | null
          produto?: string | null
          quantidade_sacas?: number | null
          status?: string
          valor: number
        }
        Update: {
          ano_safra_id?: string | null
          ciclo_id?: string | null
          contrato_id?: string
          created_at?: string
          data_pagamento?: string | null
          data_vencimento?: string
          fazenda_id?: string | null
          id?: string
          lancamento_id?: string | null
          moeda_parcela?: string | null
          observacao?: string | null
          preco_sc_ref?: number | null
          produto?: string | null
          quantidade_sacas?: number | null
          status?: string
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "cct_pagamentos_ano_safra_id_fkey"
            columns: ["ano_safra_id"]
            isOneToOne: false
            referencedRelation: "anos_safra"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cct_pagamentos_ciclo_id_fkey"
            columns: ["ciclo_id"]
            isOneToOne: false
            referencedRelation: "ciclos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cct_pagamentos_contrato_id_fkey"
            columns: ["contrato_id"]
            isOneToOne: false
            referencedRelation: "contratos_compra_terra"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cct_pagamentos_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cct_pagamentos_lancamento_id_fkey"
            columns: ["lancamento_id"]
            isOneToOne: false
            referencedRelation: "lancamentos"
            referencedColumns: ["id"]
          },
        ]
      }
      centros_custo: {
        Row: {
          codigo: string | null
          created_at: string | null
          fazenda_id: string | null
          id: string
          manutencao_maquinas: boolean
          nome: string
          parent_id: string | null
          tipo: string
        }
        Insert: {
          codigo?: string | null
          created_at?: string | null
          fazenda_id?: string | null
          id?: string
          manutencao_maquinas?: boolean
          nome: string
          parent_id?: string | null
          tipo: string
        }
        Update: {
          codigo?: string | null
          created_at?: string | null
          fazenda_id?: string | null
          id?: string
          manutencao_maquinas?: boolean
          nome?: string
          parent_id?: string | null
          tipo?: string
        }
        Relationships: [
          {
            foreignKeyName: "centros_custo_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "centros_custo_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "centros_custo"
            referencedColumns: ["id"]
          },
        ]
      }
      centros_custo_contrato: {
        Row: {
          centro_custo_id: string | null
          ciclo_id: string | null
          contrato_id: string | null
          created_at: string | null
          descricao: string | null
          id: string
          percentual: number | null
          valor: number | null
        }
        Insert: {
          centro_custo_id?: string | null
          ciclo_id?: string | null
          contrato_id?: string | null
          created_at?: string | null
          descricao?: string | null
          id?: string
          percentual?: number | null
          valor?: number | null
        }
        Update: {
          centro_custo_id?: string | null
          ciclo_id?: string | null
          contrato_id?: string | null
          created_at?: string | null
          descricao?: string | null
          id?: string
          percentual?: number | null
          valor?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "centros_custo_contrato_centro_custo_id_fkey"
            columns: ["centro_custo_id"]
            isOneToOne: false
            referencedRelation: "centros_custo"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "centros_custo_contrato_ciclo_id_fkey"
            columns: ["ciclo_id"]
            isOneToOne: false
            referencedRelation: "ciclos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "centros_custo_contrato_contrato_id_fkey"
            columns: ["contrato_id"]
            isOneToOne: false
            referencedRelation: "contratos_financeiros"
            referencedColumns: ["id"]
          },
        ]
      }
      ciclo_talhoes: {
        Row: {
          area_plantada_ha: number
          ciclo_id: string
          created_at: string | null
          fazenda_id: string
          id: string
          talhao_id: string
        }
        Insert: {
          area_plantada_ha?: number
          ciclo_id: string
          created_at?: string | null
          fazenda_id: string
          id?: string
          talhao_id: string
        }
        Update: {
          area_plantada_ha?: number
          ciclo_id?: string
          created_at?: string | null
          fazenda_id?: string
          id?: string
          talhao_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ciclo_talhoes_ciclo_id_fkey"
            columns: ["ciclo_id"]
            isOneToOne: false
            referencedRelation: "ciclos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ciclo_talhoes_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ciclo_talhoes_talhao_id_fkey"
            columns: ["talhao_id"]
            isOneToOne: false
            referencedRelation: "talhoes"
            referencedColumns: ["id"]
          },
        ]
      }
      ciclos: {
        Row: {
          absorcao_pct: number | null
          ano_safra_id: string
          area_plantada_ha: number | null
          ciclo_pai_id: string | null
          created_at: string | null
          cultura: string
          data_fim: string
          data_inicio: string
          descricao: string
          fazenda_id: string
          id: string
          is_auxiliar: boolean | null
          motivo_auxiliar: string | null
          preco_esperado_sc: number | null
          produtividade_esperada_sc_ha: number | null
          produto_agricola_id: string | null
        }
        Insert: {
          absorcao_pct?: number | null
          ano_safra_id: string
          area_plantada_ha?: number | null
          ciclo_pai_id?: string | null
          created_at?: string | null
          cultura: string
          data_fim: string
          data_inicio: string
          descricao: string
          fazenda_id: string
          id?: string
          is_auxiliar?: boolean | null
          motivo_auxiliar?: string | null
          preco_esperado_sc?: number | null
          produtividade_esperada_sc_ha?: number | null
          produto_agricola_id?: string | null
        }
        Update: {
          absorcao_pct?: number | null
          ano_safra_id?: string
          area_plantada_ha?: number | null
          ciclo_pai_id?: string | null
          created_at?: string | null
          cultura?: string
          data_fim?: string
          data_inicio?: string
          descricao?: string
          fazenda_id?: string
          id?: string
          is_auxiliar?: boolean | null
          motivo_auxiliar?: string | null
          preco_esperado_sc?: number | null
          produtividade_esperada_sc_ha?: number | null
          produto_agricola_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ciclos_ano_safra_id_fkey"
            columns: ["ano_safra_id"]
            isOneToOne: false
            referencedRelation: "anos_safra"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ciclos_ciclo_pai_id_fkey"
            columns: ["ciclo_pai_id"]
            isOneToOne: false
            referencedRelation: "ciclos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ciclos_produto_agricola_id_fkey"
            columns: ["produto_agricola_id"]
            isOneToOne: false
            referencedRelation: "insumos"
            referencedColumns: ["id"]
          },
        ]
      }
      ciots: {
        Row: {
          ambiente: string
          codigo_verificador: string
          cpf_cnpj_contratado: string
          cpf_cnpj_contratante: string
          created_at: string
          data_fim: string | null
          data_inicio: string | null
          id: string
          id_operacao: string
          mdfe_id: string | null
          placa: string | null
          protocolo: string | null
          status: string
          valor_frete: number | null
        }
        Insert: {
          ambiente?: string
          codigo_verificador: string
          cpf_cnpj_contratado: string
          cpf_cnpj_contratante: string
          created_at?: string
          data_fim?: string | null
          data_inicio?: string | null
          id?: string
          id_operacao: string
          mdfe_id?: string | null
          placa?: string | null
          protocolo?: string | null
          status?: string
          valor_frete?: number | null
        }
        Update: {
          ambiente?: string
          codigo_verificador?: string
          cpf_cnpj_contratado?: string
          cpf_cnpj_contratante?: string
          created_at?: string
          data_fim?: string | null
          data_inicio?: string | null
          id?: string
          id_operacao?: string
          mdfe_id?: string | null
          placa?: string | null
          protocolo?: string | null
          status?: string
          valor_frete?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ciots_mdfe_id_fkey"
            columns: ["mdfe_id"]
            isOneToOne: false
            referencedRelation: "mdfes"
            referencedColumns: ["id"]
          },
        ]
      }
      colheita_romaneios: {
        Row: {
          ardidos_pct: number | null
          avariados_padrao_pct: number | null
          avariados_pct: number | null
          carunchados_pct: number | null
          colheita_id: string | null
          created_at: string | null
          data: string | null
          desconto_avariados_kg: number | null
          desconto_impureza_kg: number | null
          desconto_umidade_kg: number | null
          esverdeados_pct: number | null
          fazenda_id: string | null
          fermentados_pct: number | null
          germinados_pct: number | null
          id: string
          impureza_pct: number | null
          mofados_pct: number | null
          numero: string | null
          outros_avariados_pct: number | null
          peso_bruto_kg: number
          peso_classificado_kg: number
          peso_liquido_kg: number
          ph_hl: number | null
          placa: string
          quebrados_pct: number | null
          sacas: number
          tara_kg: number
          umidade_padrao_pct: number | null
          umidade_pct: number | null
        }
        Insert: {
          ardidos_pct?: number | null
          avariados_padrao_pct?: number | null
          avariados_pct?: number | null
          carunchados_pct?: number | null
          colheita_id?: string | null
          created_at?: string | null
          data?: string | null
          desconto_avariados_kg?: number | null
          desconto_impureza_kg?: number | null
          desconto_umidade_kg?: number | null
          esverdeados_pct?: number | null
          fazenda_id?: string | null
          fermentados_pct?: number | null
          germinados_pct?: number | null
          id?: string
          impureza_pct?: number | null
          mofados_pct?: number | null
          numero?: string | null
          outros_avariados_pct?: number | null
          peso_bruto_kg: number
          peso_classificado_kg: number
          peso_liquido_kg: number
          ph_hl?: number | null
          placa: string
          quebrados_pct?: number | null
          sacas: number
          tara_kg: number
          umidade_padrao_pct?: number | null
          umidade_pct?: number | null
        }
        Update: {
          ardidos_pct?: number | null
          avariados_padrao_pct?: number | null
          avariados_pct?: number | null
          carunchados_pct?: number | null
          colheita_id?: string | null
          created_at?: string | null
          data?: string | null
          desconto_avariados_kg?: number | null
          desconto_impureza_kg?: number | null
          desconto_umidade_kg?: number | null
          esverdeados_pct?: number | null
          fazenda_id?: string | null
          fermentados_pct?: number | null
          germinados_pct?: number | null
          id?: string
          impureza_pct?: number | null
          mofados_pct?: number | null
          numero?: string | null
          outros_avariados_pct?: number | null
          peso_bruto_kg?: number
          peso_classificado_kg?: number
          peso_liquido_kg?: number
          ph_hl?: number | null
          placa?: string
          quebrados_pct?: number | null
          sacas?: number
          tara_kg?: number
          umidade_padrao_pct?: number | null
          umidade_pct?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "colheita_romaneios_colheita_id_fkey"
            columns: ["colheita_id"]
            isOneToOne: false
            referencedRelation: "colheitas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "colheita_romaneios_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      colheitas: {
        Row: {
          aprovado_em: string | null
          aprovado_por_perfil_id: string | null
          area_ha: number | null
          avariados_media: number | null
          ciclo_id: string | null
          created_at: string | null
          data_colheita: string
          deposito_id: string | null
          fazenda_id: string | null
          id: string
          impureza_media: number | null
          lancado_por_perfil_id: string | null
          motivo_rejeicao: string | null
          observacao: string | null
          origem_lancamento: string
          origem_op_id: string | null
          produtividade_sc_ha: number | null
          produto: string
          safra_id: string | null
          status_campo: string
          talhao_id: string | null
          total_kg_bruto: number | null
          total_kg_classificado: number | null
          total_sacas: number | null
          umidade_media: number | null
          variedade: string | null
        }
        Insert: {
          aprovado_em?: string | null
          aprovado_por_perfil_id?: string | null
          area_ha?: number | null
          avariados_media?: number | null
          ciclo_id?: string | null
          created_at?: string | null
          data_colheita: string
          deposito_id?: string | null
          fazenda_id?: string | null
          id?: string
          impureza_media?: number | null
          lancado_por_perfil_id?: string | null
          motivo_rejeicao?: string | null
          observacao?: string | null
          origem_lancamento?: string
          origem_op_id?: string | null
          produtividade_sc_ha?: number | null
          produto: string
          safra_id?: string | null
          status_campo?: string
          talhao_id?: string | null
          total_kg_bruto?: number | null
          total_kg_classificado?: number | null
          total_sacas?: number | null
          umidade_media?: number | null
          variedade?: string | null
        }
        Update: {
          aprovado_em?: string | null
          aprovado_por_perfil_id?: string | null
          area_ha?: number | null
          avariados_media?: number | null
          ciclo_id?: string | null
          created_at?: string | null
          data_colheita?: string
          deposito_id?: string | null
          fazenda_id?: string | null
          id?: string
          impureza_media?: number | null
          lancado_por_perfil_id?: string | null
          motivo_rejeicao?: string | null
          observacao?: string | null
          origem_lancamento?: string
          origem_op_id?: string | null
          produtividade_sc_ha?: number | null
          produto?: string
          safra_id?: string | null
          status_campo?: string
          talhao_id?: string | null
          total_kg_bruto?: number | null
          total_kg_classificado?: number | null
          total_sacas?: number | null
          umidade_media?: number | null
          variedade?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "colheitas_aprovado_por_perfil_id_fkey"
            columns: ["aprovado_por_perfil_id"]
            isOneToOne: false
            referencedRelation: "perfis"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "colheitas_ciclo_id_fkey"
            columns: ["ciclo_id"]
            isOneToOne: false
            referencedRelation: "ciclos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "colheitas_deposito_id_fkey"
            columns: ["deposito_id"]
            isOneToOne: false
            referencedRelation: "depositos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "colheitas_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "colheitas_lancado_por_perfil_id_fkey"
            columns: ["lancado_por_perfil_id"]
            isOneToOne: false
            referencedRelation: "perfis"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "colheitas_safra_id_fkey"
            columns: ["safra_id"]
            isOneToOne: false
            referencedRelation: "safras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "colheitas_talhao_id_fkey"
            columns: ["talhao_id"]
            isOneToOne: false
            referencedRelation: "talhoes"
            referencedColumns: ["id"]
          },
        ]
      }
      comercializacao_metas: {
        Row: {
          ciclo_id: string | null
          created_at: string | null
          data_referencia: string | null
          fazenda_id: string | null
          id: string
          meta_pct: number
          milestone: string
        }
        Insert: {
          ciclo_id?: string | null
          created_at?: string | null
          data_referencia?: string | null
          fazenda_id?: string | null
          id?: string
          meta_pct: number
          milestone: string
        }
        Update: {
          ciclo_id?: string | null
          created_at?: string | null
          data_referencia?: string | null
          fazenda_id?: string | null
          id?: string
          meta_pct?: number
          milestone?: string
        }
        Relationships: [
          {
            foreignKeyName: "comercializacao_metas_ciclo_id_fkey"
            columns: ["ciclo_id"]
            isOneToOne: false
            referencedRelation: "ciclos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comercializacao_metas_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      conciliacao_pendencias: {
        Row: {
          conta_id: string | null
          conta_nome: string | null
          created_at: string | null
          data: string
          descricao: string
          fazenda_id: string
          fitid: string
          id: string
          lancamento_id: string | null
          status: string
          tipo: string
          valor: number
        }
        Insert: {
          conta_id?: string | null
          conta_nome?: string | null
          created_at?: string | null
          data: string
          descricao: string
          fazenda_id: string
          fitid: string
          id?: string
          lancamento_id?: string | null
          status?: string
          tipo: string
          valor: number
        }
        Update: {
          conta_id?: string | null
          conta_nome?: string | null
          created_at?: string | null
          data?: string
          descricao?: string
          fazenda_id?: string
          fitid?: string
          id?: string
          lancamento_id?: string | null
          status?: string
          tipo?: string
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "conciliacao_pendencias_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "contas_bancarias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conciliacao_pendencias_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conciliacao_pendencias_lancamento_id_fkey"
            columns: ["lancamento_id"]
            isOneToOne: false
            referencedRelation: "lancamentos"
            referencedColumns: ["id"]
          },
        ]
      }
      config_contabilidade: {
        Row: {
          ativo: boolean
          cnpj: string | null
          cod_municipio_ibge: string | null
          cpf: string | null
          created_at: string | null
          entidade: string
          fazenda_id: string
          id: string
          ie: string | null
          ind_sit_ini: string | null
          nire: string | null
          nome_empresarial: string
          nome_livro: string | null
          nome_municipio: string | null
          nr_livro: string | null
          nr_tipo_livro: string | null
          resp_cpf: string | null
          resp_crc: string | null
          resp_email: string | null
          resp_nome: string | null
          termo_abertura: string | null
          termo_encerramento: string | null
          tipo_escrituracao: string
          uf: string | null
        }
        Insert: {
          ativo?: boolean
          cnpj?: string | null
          cod_municipio_ibge?: string | null
          cpf?: string | null
          created_at?: string | null
          entidade: string
          fazenda_id: string
          id?: string
          ie?: string | null
          ind_sit_ini?: string | null
          nire?: string | null
          nome_empresarial?: string
          nome_livro?: string | null
          nome_municipio?: string | null
          nr_livro?: string | null
          nr_tipo_livro?: string | null
          resp_cpf?: string | null
          resp_crc?: string | null
          resp_email?: string | null
          resp_nome?: string | null
          termo_abertura?: string | null
          termo_encerramento?: string | null
          tipo_escrituracao?: string
          uf?: string | null
        }
        Update: {
          ativo?: boolean
          cnpj?: string | null
          cod_municipio_ibge?: string | null
          cpf?: string | null
          created_at?: string | null
          entidade?: string
          fazenda_id?: string
          id?: string
          ie?: string | null
          ind_sit_ini?: string | null
          nire?: string | null
          nome_empresarial?: string
          nome_livro?: string | null
          nome_municipio?: string | null
          nr_livro?: string | null
          nr_tipo_livro?: string | null
          resp_cpf?: string | null
          resp_crc?: string | null
          resp_email?: string | null
          resp_nome?: string | null
          termo_abertura?: string | null
          termo_encerramento?: string | null
          tipo_escrituracao?: string
          uf?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "config_contabilidade_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      configuracoes: {
        Row: {
          automacoes: Json | null
          cert_a1_storage_key: string | null
          cert_a1_validade: string | null
          created_at: string | null
          email_principal: string | null
          email_relatorios: string | null
          fazenda_id: string
          id: string
        }
        Insert: {
          automacoes?: Json | null
          cert_a1_storage_key?: string | null
          cert_a1_validade?: string | null
          created_at?: string | null
          email_principal?: string | null
          email_relatorios?: string | null
          fazenda_id: string
          id?: string
        }
        Update: {
          automacoes?: Json | null
          cert_a1_storage_key?: string | null
          cert_a1_validade?: string | null
          created_at?: string | null
          email_principal?: string | null
          email_relatorios?: string | null
          fazenda_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "configuracoes_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: true
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      configuracoes_automacao: {
        Row: {
          ativa: boolean
          automacao_id: string
          config: Json | null
          created_at: string | null
          fazenda_id: string
          id: string
        }
        Insert: {
          ativa?: boolean
          automacao_id: string
          config?: Json | null
          created_at?: string | null
          fazenda_id: string
          id?: string
        }
        Update: {
          ativa?: boolean
          automacao_id?: string
          config?: Json | null
          created_at?: string | null
          fazenda_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "configuracoes_automacao_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      configuracoes_modulo: {
        Row: {
          config: Json
          fazenda_id: string
          modulo: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          config?: Json
          fazenda_id: string
          modulo: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          config?: Json
          fazenda_id?: string
          modulo?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "configuracoes_modulo_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      configuracoes_nfe: {
        Row: {
          aliquota_cbs: number | null
          aliquota_cofins: number | null
          aliquota_ibs: number | null
          aliquota_icms_interestadual_demais: number | null
          aliquota_icms_interestadual_sul_sudeste: number | null
          aliquota_icms_intraestadual: number | null
          aliquota_pis: number | null
          ambiente: string
          armazenar_xml_storage: boolean | null
          cfop_devolucao_compra: string | null
          cfop_remessa_armazem: string | null
          cfop_retorno_armazem: string | null
          cfop_venda_inter: string | null
          cfop_venda_intra: string | null
          created_at: string | null
          cst_pis_cofins: string | null
          destaque_ibs_cbs: boolean | null
          email_copia_xml: string | null
          emissao_automatica: boolean | null
          enviar_xml_email: boolean | null
          fazenda_id: string
          forma_emissao: string
          funrural_aliquota_inss: number | null
          funrural_aliquota_rat: number | null
          funrural_aliquota_senar: number | null
          funrural_ativo: boolean | null
          funrural_responsavel: string | null
          funrural_texto: string | null
          gerar_danfe_auto: boolean | null
          icms_diferido: boolean | null
          id: string
          modelo: string
          pct_icms_diferido: number | null
          pis_cofins_ativo: boolean | null
          proximo_numero: number
          regime_tributario: string
          serie: string
          texto_complementar: string | null
          texto_ibs_cbs: string | null
          texto_icms_diferido: string | null
          texto_produtor_rural: string | null
          textos_por_cfop: Json | null
          tipo_emitente: string
          updated_at: string | null
        }
        Insert: {
          aliquota_cbs?: number | null
          aliquota_cofins?: number | null
          aliquota_ibs?: number | null
          aliquota_icms_interestadual_demais?: number | null
          aliquota_icms_interestadual_sul_sudeste?: number | null
          aliquota_icms_intraestadual?: number | null
          aliquota_pis?: number | null
          ambiente?: string
          armazenar_xml_storage?: boolean | null
          cfop_devolucao_compra?: string | null
          cfop_remessa_armazem?: string | null
          cfop_retorno_armazem?: string | null
          cfop_venda_inter?: string | null
          cfop_venda_intra?: string | null
          created_at?: string | null
          cst_pis_cofins?: string | null
          destaque_ibs_cbs?: boolean | null
          email_copia_xml?: string | null
          emissao_automatica?: boolean | null
          enviar_xml_email?: boolean | null
          fazenda_id: string
          forma_emissao?: string
          funrural_aliquota_inss?: number | null
          funrural_aliquota_rat?: number | null
          funrural_aliquota_senar?: number | null
          funrural_ativo?: boolean | null
          funrural_responsavel?: string | null
          funrural_texto?: string | null
          gerar_danfe_auto?: boolean | null
          icms_diferido?: boolean | null
          id?: string
          modelo?: string
          pct_icms_diferido?: number | null
          pis_cofins_ativo?: boolean | null
          proximo_numero?: number
          regime_tributario?: string
          serie?: string
          texto_complementar?: string | null
          texto_ibs_cbs?: string | null
          texto_icms_diferido?: string | null
          texto_produtor_rural?: string | null
          textos_por_cfop?: Json | null
          tipo_emitente?: string
          updated_at?: string | null
        }
        Update: {
          aliquota_cbs?: number | null
          aliquota_cofins?: number | null
          aliquota_ibs?: number | null
          aliquota_icms_interestadual_demais?: number | null
          aliquota_icms_interestadual_sul_sudeste?: number | null
          aliquota_icms_intraestadual?: number | null
          aliquota_pis?: number | null
          ambiente?: string
          armazenar_xml_storage?: boolean | null
          cfop_devolucao_compra?: string | null
          cfop_remessa_armazem?: string | null
          cfop_retorno_armazem?: string | null
          cfop_venda_inter?: string | null
          cfop_venda_intra?: string | null
          created_at?: string | null
          cst_pis_cofins?: string | null
          destaque_ibs_cbs?: boolean | null
          email_copia_xml?: string | null
          emissao_automatica?: boolean | null
          enviar_xml_email?: boolean | null
          fazenda_id?: string
          forma_emissao?: string
          funrural_aliquota_inss?: number | null
          funrural_aliquota_rat?: number | null
          funrural_aliquota_senar?: number | null
          funrural_ativo?: boolean | null
          funrural_responsavel?: string | null
          funrural_texto?: string | null
          gerar_danfe_auto?: boolean | null
          icms_diferido?: boolean | null
          id?: string
          modelo?: string
          pct_icms_diferido?: number | null
          pis_cofins_ativo?: boolean | null
          proximo_numero?: number
          regime_tributario?: string
          serie?: string
          texto_complementar?: string | null
          texto_ibs_cbs?: string | null
          texto_icms_diferido?: string | null
          texto_produtor_rural?: string | null
          textos_por_cfop?: Json | null
          tipo_emitente?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "configuracoes_nfe_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: true
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      consorcio_rateios: {
        Row: {
          centro_custo_id: string | null
          ciclo_id: string | null
          consorcio_id: string
          created_at: string | null
          id: string
          percentual: number
        }
        Insert: {
          centro_custo_id?: string | null
          ciclo_id?: string | null
          consorcio_id: string
          created_at?: string | null
          id?: string
          percentual: number
        }
        Update: {
          centro_custo_id?: string | null
          ciclo_id?: string | null
          consorcio_id?: string
          created_at?: string | null
          id?: string
          percentual?: number
        }
        Relationships: [
          {
            foreignKeyName: "consorcio_rateios_centro_custo_id_fkey"
            columns: ["centro_custo_id"]
            isOneToOne: false
            referencedRelation: "centros_custo"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consorcio_rateios_ciclo_id_fkey"
            columns: ["ciclo_id"]
            isOneToOne: false
            referencedRelation: "ciclos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consorcio_rateios_consorcio_id_fkey"
            columns: ["consorcio_id"]
            isOneToOne: false
            referencedRelation: "consorcios"
            referencedColumns: ["id"]
          },
        ]
      }
      consorcios: {
        Row: {
          administradora: string
          administradora_pessoa_id: string | null
          bem_adquirido: string | null
          created_at: string | null
          data_contemplacao: string | null
          data_encerramento: string | null
          data_inicio: string
          descricao_bem: string
          fazenda_id: string
          financiamento_id: string | null
          grupo: string
          id: string
          numero_cota: string
          observacao: string | null
          parcelas_pagas: number
          produtor_id: string | null
          status: string
          tipo_bem: string
          total_parcelas: number
          valor_credito: number
          valor_lance: number | null
          valor_parcela_mensal: number
        }
        Insert: {
          administradora: string
          administradora_pessoa_id?: string | null
          bem_adquirido?: string | null
          created_at?: string | null
          data_contemplacao?: string | null
          data_encerramento?: string | null
          data_inicio: string
          descricao_bem?: string
          fazenda_id: string
          financiamento_id?: string | null
          grupo?: string
          id?: string
          numero_cota: string
          observacao?: string | null
          parcelas_pagas?: number
          produtor_id?: string | null
          status?: string
          tipo_bem?: string
          total_parcelas?: number
          valor_credito?: number
          valor_lance?: number | null
          valor_parcela_mensal?: number
        }
        Update: {
          administradora?: string
          administradora_pessoa_id?: string | null
          bem_adquirido?: string | null
          created_at?: string | null
          data_contemplacao?: string | null
          data_encerramento?: string | null
          data_inicio?: string
          descricao_bem?: string
          fazenda_id?: string
          financiamento_id?: string | null
          grupo?: string
          id?: string
          numero_cota?: string
          observacao?: string | null
          parcelas_pagas?: number
          produtor_id?: string | null
          status?: string
          tipo_bem?: string
          total_parcelas?: number
          valor_credito?: number
          valor_lance?: number | null
          valor_parcela_mensal?: number
        }
        Relationships: [
          {
            foreignKeyName: "consorcios_administradora_pessoa_id_fkey"
            columns: ["administradora_pessoa_id"]
            isOneToOne: false
            referencedRelation: "pessoas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consorcios_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consorcios_produtor_id_fkey"
            columns: ["produtor_id"]
            isOneToOne: false
            referencedRelation: "produtores"
            referencedColumns: ["id"]
          },
        ]
      }
      conta_modulos: {
        Row: {
          conta_id: string
          created_at: string
          habilitado: boolean
          modulo: string
          motivo: string | null
        }
        Insert: {
          conta_id: string
          created_at?: string
          habilitado?: boolean
          modulo: string
          motivo?: string | null
        }
        Update: {
          conta_id?: string
          created_at?: string
          habilitado?: boolean
          modulo?: string
          motivo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conta_modulos_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "contas"
            referencedColumns: ["id"]
          },
        ]
      }
      contas: {
        Row: {
          cidade: string | null
          cpf_cnpj: string | null
          created_at: string | null
          crm_obs: string | null
          crm_stage: string | null
          data_inicio: string | null
          data_vencimento: string | null
          email_contato: string | null
          estado: string | null
          id: string
          liberado_raccolto: boolean
          logo_url: string | null
          nome: string
          nome_fazenda: string | null
          obs_admin: string | null
          onboarding_ativo: boolean
          origem: string | null
          pacote: string | null
          parceiro_id: string | null
          pro_bono: boolean | null
          pro_bono_motivo: string | null
          status: string | null
          storage_usado_bytes: number
          telefone: string | null
          tipo: string
          valor_mensalidade: number | null
        }
        Insert: {
          cidade?: string | null
          cpf_cnpj?: string | null
          created_at?: string | null
          crm_obs?: string | null
          crm_stage?: string | null
          data_inicio?: string | null
          data_vencimento?: string | null
          email_contato?: string | null
          estado?: string | null
          id?: string
          liberado_raccolto?: boolean
          logo_url?: string | null
          nome: string
          nome_fazenda?: string | null
          obs_admin?: string | null
          onboarding_ativo?: boolean
          origem?: string | null
          pacote?: string | null
          parceiro_id?: string | null
          pro_bono?: boolean | null
          pro_bono_motivo?: string | null
          status?: string | null
          storage_usado_bytes?: number
          telefone?: string | null
          tipo?: string
          valor_mensalidade?: number | null
        }
        Update: {
          cidade?: string | null
          cpf_cnpj?: string | null
          created_at?: string | null
          crm_obs?: string | null
          crm_stage?: string | null
          data_inicio?: string | null
          data_vencimento?: string | null
          email_contato?: string | null
          estado?: string | null
          id?: string
          liberado_raccolto?: boolean
          logo_url?: string | null
          nome?: string
          nome_fazenda?: string | null
          obs_admin?: string | null
          onboarding_ativo?: boolean
          origem?: string | null
          pacote?: string | null
          parceiro_id?: string | null
          pro_bono?: boolean | null
          pro_bono_motivo?: string | null
          status?: string | null
          storage_usado_bytes?: number
          telefone?: string | null
          tipo?: string
          valor_mensalidade?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "contas_parceiro_id_fkey"
            columns: ["parceiro_id"]
            isOneToOne: false
            referencedRelation: "parceiros"
            referencedColumns: ["id"]
          },
        ]
      }
      contas_bancarias: {
        Row: {
          agencia: string | null
          agencia_dv: string | null
          ativa: boolean
          banco: string | null
          banco_id: string | null
          codigo_bacen: string | null
          conjunta: boolean
          conta: string | null
          conta_dv: string | null
          cotitulares: Json | null
          created_at: string | null
          empresa_id: string | null
          fazenda_id: string
          id: string
          moeda: string
          nome: string
          produtor_id: string | null
          saldo_inicial: number
          tipo_conta: string
        }
        Insert: {
          agencia?: string | null
          agencia_dv?: string | null
          ativa?: boolean
          banco?: string | null
          banco_id?: string | null
          codigo_bacen?: string | null
          conjunta?: boolean
          conta?: string | null
          conta_dv?: string | null
          cotitulares?: Json | null
          created_at?: string | null
          empresa_id?: string | null
          fazenda_id: string
          id?: string
          moeda?: string
          nome: string
          produtor_id?: string | null
          saldo_inicial?: number
          tipo_conta?: string
        }
        Update: {
          agencia?: string | null
          agencia_dv?: string | null
          ativa?: boolean
          banco?: string | null
          banco_id?: string | null
          codigo_bacen?: string | null
          conjunta?: boolean
          conta?: string | null
          conta_dv?: string | null
          cotitulares?: Json | null
          created_at?: string | null
          empresa_id?: string | null
          fazenda_id?: string
          id?: string
          moeda?: string
          nome?: string
          produtor_id?: string | null
          saldo_inicial?: number
          tipo_conta?: string
        }
        Relationships: [
          {
            foreignKeyName: "contas_bancarias_banco_id_fkey"
            columns: ["banco_id"]
            isOneToOne: false
            referencedRelation: "bancos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contas_bancarias_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contas_bancarias_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contas_bancarias_produtor_id_fkey"
            columns: ["produtor_id"]
            isOneToOne: false
            referencedRelation: "produtores"
            referencedColumns: ["id"]
          },
        ]
      }
      contrato_cessao_debitos: {
        Row: {
          contrato_id: string
          created_at: string | null
          fazenda_id: string
          fornecedor_id: string | null
          id: string
          lancamento_id: string
          obs: string | null
          pedido_compra_id: string | null
          valor_cessao: number
        }
        Insert: {
          contrato_id: string
          created_at?: string | null
          fazenda_id: string
          fornecedor_id?: string | null
          id?: string
          lancamento_id: string
          obs?: string | null
          pedido_compra_id?: string | null
          valor_cessao?: number
        }
        Update: {
          contrato_id?: string
          created_at?: string | null
          fazenda_id?: string
          fornecedor_id?: string | null
          id?: string
          lancamento_id?: string
          obs?: string | null
          pedido_compra_id?: string | null
          valor_cessao?: number
        }
        Relationships: [
          {
            foreignKeyName: "contrato_cessao_debitos_contrato_id_fkey"
            columns: ["contrato_id"]
            isOneToOne: false
            referencedRelation: "contratos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contrato_cessao_debitos_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contrato_cessao_debitos_lancamento_id_fkey"
            columns: ["lancamento_id"]
            isOneToOne: false
            referencedRelation: "lancamentos"
            referencedColumns: ["id"]
          },
        ]
      }
      contrato_itens: {
        Row: {
          classificacao: string | null
          contrato_id: string | null
          created_at: string | null
          fazenda_id: string | null
          id: string
          moeda: string | null
          produto: string
          quantidade: number
          tipo: string | null
          unidade: string
          valor_total: number | null
          valor_unitario: number
        }
        Insert: {
          classificacao?: string | null
          contrato_id?: string | null
          created_at?: string | null
          fazenda_id?: string | null
          id?: string
          moeda?: string | null
          produto: string
          quantidade?: number
          tipo?: string | null
          unidade?: string
          valor_total?: number | null
          valor_unitario?: number
        }
        Update: {
          classificacao?: string | null
          contrato_id?: string | null
          created_at?: string | null
          fazenda_id?: string | null
          id?: string
          moeda?: string | null
          produto?: string
          quantidade?: number
          tipo?: string | null
          unidade?: string
          valor_total?: number | null
          valor_unitario?: number
        }
        Relationships: [
          {
            foreignKeyName: "contrato_itens_contrato_id_fkey"
            columns: ["contrato_id"]
            isOneToOne: false
            referencedRelation: "contratos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contrato_itens_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      contratos: {
        Row: {
          a_fixar: boolean | null
          ano_safra_id: string | null
          arrendamento_id: string | null
          autorizacao: string | null
          cct_pagamento_id: string | null
          cessao_beneficiarios: Json | null
          cessao_data: string | null
          cessao_fornecedor_id: string | null
          cessao_fornecedor_nome: string | null
          cessao_obs: string | null
          cfop: string | null
          ciclo_id: string | null
          comprador: string
          comprador_final_id: string | null
          comprador_final_nome: string | null
          confirmado: boolean | null
          contato_broker: string | null
          corretora: string | null
          cotacao_usd: number | null
          created_at: string | null
          cte_numero: string | null
          dado_em_cessao: boolean | null
          data_contrato: string
          data_entrega: string
          data_pagamento: string | null
          deposito_carregamento: string | null
          deposito_fiscal: boolean | null
          empreendimento: string | null
          entregue_sc: number
          fazenda_id: string
          frete: string | null
          grupo_vendedor: string | null
          id: string
          ie_id: string | null
          is_arrendamento: boolean | null
          is_barter: boolean | null
          is_compra_terra: boolean | null
          is_triangulacao: boolean | null
          lancamento_cr_id: string | null
          local_entrega_cep: string | null
          local_entrega_cnpj: string | null
          local_entrega_logradouro: string | null
          local_entrega_municipio: string | null
          local_entrega_nome: string | null
          local_entrega_pessoa_id: string | null
          local_entrega_uf: string | null
          modalidade: string
          moeda: string
          natureza_operacao: string | null
          nr_contrato_cliente: string | null
          num_lancamento: number | null
          numero: string
          observacao: string | null
          observacao_interna: string | null
          pdf_nome: string | null
          pdf_url: string | null
          pedido_compra_id: string | null
          pessoa_id: string | null
          preco: number
          produto: string
          produto_agricola_id: string | null
          produtor_id: string | null
          produtor_nome: string | null
          propriedade: string | null
          quantidade_sc: number
          safra: string
          saldo_tipo: string | null
          seguradora: string | null
          status: string
          terceiro: string | null
          tipo: string | null
          valor_frete: number | null
          venda_a_ordem: boolean | null
          vendedor: string | null
        }
        Insert: {
          a_fixar?: boolean | null
          ano_safra_id?: string | null
          arrendamento_id?: string | null
          autorizacao?: string | null
          cct_pagamento_id?: string | null
          cessao_beneficiarios?: Json | null
          cessao_data?: string | null
          cessao_fornecedor_id?: string | null
          cessao_fornecedor_nome?: string | null
          cessao_obs?: string | null
          cfop?: string | null
          ciclo_id?: string | null
          comprador: string
          comprador_final_id?: string | null
          comprador_final_nome?: string | null
          confirmado?: boolean | null
          contato_broker?: string | null
          corretora?: string | null
          cotacao_usd?: number | null
          created_at?: string | null
          cte_numero?: string | null
          dado_em_cessao?: boolean | null
          data_contrato: string
          data_entrega: string
          data_pagamento?: string | null
          deposito_carregamento?: string | null
          deposito_fiscal?: boolean | null
          empreendimento?: string | null
          entregue_sc?: number
          fazenda_id: string
          frete?: string | null
          grupo_vendedor?: string | null
          id?: string
          ie_id?: string | null
          is_arrendamento?: boolean | null
          is_barter?: boolean | null
          is_compra_terra?: boolean | null
          is_triangulacao?: boolean | null
          lancamento_cr_id?: string | null
          local_entrega_cep?: string | null
          local_entrega_cnpj?: string | null
          local_entrega_logradouro?: string | null
          local_entrega_municipio?: string | null
          local_entrega_nome?: string | null
          local_entrega_pessoa_id?: string | null
          local_entrega_uf?: string | null
          modalidade?: string
          moeda?: string
          natureza_operacao?: string | null
          nr_contrato_cliente?: string | null
          num_lancamento?: number | null
          numero: string
          observacao?: string | null
          observacao_interna?: string | null
          pdf_nome?: string | null
          pdf_url?: string | null
          pedido_compra_id?: string | null
          pessoa_id?: string | null
          preco: number
          produto: string
          produto_agricola_id?: string | null
          produtor_id?: string | null
          produtor_nome?: string | null
          propriedade?: string | null
          quantidade_sc: number
          safra: string
          saldo_tipo?: string | null
          seguradora?: string | null
          status?: string
          terceiro?: string | null
          tipo?: string | null
          valor_frete?: number | null
          venda_a_ordem?: boolean | null
          vendedor?: string | null
        }
        Update: {
          a_fixar?: boolean | null
          ano_safra_id?: string | null
          arrendamento_id?: string | null
          autorizacao?: string | null
          cct_pagamento_id?: string | null
          cessao_beneficiarios?: Json | null
          cessao_data?: string | null
          cessao_fornecedor_id?: string | null
          cessao_fornecedor_nome?: string | null
          cessao_obs?: string | null
          cfop?: string | null
          ciclo_id?: string | null
          comprador?: string
          comprador_final_id?: string | null
          comprador_final_nome?: string | null
          confirmado?: boolean | null
          contato_broker?: string | null
          corretora?: string | null
          cotacao_usd?: number | null
          created_at?: string | null
          cte_numero?: string | null
          dado_em_cessao?: boolean | null
          data_contrato?: string
          data_entrega?: string
          data_pagamento?: string | null
          deposito_carregamento?: string | null
          deposito_fiscal?: boolean | null
          empreendimento?: string | null
          entregue_sc?: number
          fazenda_id?: string
          frete?: string | null
          grupo_vendedor?: string | null
          id?: string
          ie_id?: string | null
          is_arrendamento?: boolean | null
          is_barter?: boolean | null
          is_compra_terra?: boolean | null
          is_triangulacao?: boolean | null
          lancamento_cr_id?: string | null
          local_entrega_cep?: string | null
          local_entrega_cnpj?: string | null
          local_entrega_logradouro?: string | null
          local_entrega_municipio?: string | null
          local_entrega_nome?: string | null
          local_entrega_pessoa_id?: string | null
          local_entrega_uf?: string | null
          modalidade?: string
          moeda?: string
          natureza_operacao?: string | null
          nr_contrato_cliente?: string | null
          num_lancamento?: number | null
          numero?: string
          observacao?: string | null
          observacao_interna?: string | null
          pdf_nome?: string | null
          pdf_url?: string | null
          pedido_compra_id?: string | null
          pessoa_id?: string | null
          preco?: number
          produto?: string
          produto_agricola_id?: string | null
          produtor_id?: string | null
          produtor_nome?: string | null
          propriedade?: string | null
          quantidade_sc?: number
          safra?: string
          saldo_tipo?: string | null
          seguradora?: string | null
          status?: string
          terceiro?: string | null
          tipo?: string | null
          valor_frete?: number | null
          venda_a_ordem?: boolean | null
          vendedor?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contratos_ano_safra_id_fkey"
            columns: ["ano_safra_id"]
            isOneToOne: false
            referencedRelation: "anos_safra"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contratos_arrendamento_id_fkey"
            columns: ["arrendamento_id"]
            isOneToOne: false
            referencedRelation: "arrendamentos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contratos_cct_pagamento_id_fkey"
            columns: ["cct_pagamento_id"]
            isOneToOne: false
            referencedRelation: "cct_pagamentos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contratos_cessao_fornecedor_id_fkey"
            columns: ["cessao_fornecedor_id"]
            isOneToOne: false
            referencedRelation: "pessoas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contratos_ciclo_id_fkey"
            columns: ["ciclo_id"]
            isOneToOne: false
            referencedRelation: "ciclos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contratos_comprador_final_id_fkey"
            columns: ["comprador_final_id"]
            isOneToOne: false
            referencedRelation: "pessoas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contratos_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contratos_ie_id_fkey"
            columns: ["ie_id"]
            isOneToOne: false
            referencedRelation: "produtor_inscricoes_estaduais"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contratos_lancamento_cr_id_fkey"
            columns: ["lancamento_cr_id"]
            isOneToOne: false
            referencedRelation: "lancamentos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contratos_local_entrega_pessoa_id_fkey"
            columns: ["local_entrega_pessoa_id"]
            isOneToOne: false
            referencedRelation: "pessoas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contratos_pedido_compra_id_fkey"
            columns: ["pedido_compra_id"]
            isOneToOne: false
            referencedRelation: "pedidos_compra"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contratos_pessoa_id_fkey"
            columns: ["pessoa_id"]
            isOneToOne: false
            referencedRelation: "pessoas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contratos_produto_agricola_id_fkey"
            columns: ["produto_agricola_id"]
            isOneToOne: false
            referencedRelation: "insumos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contratos_produtor_id_fkey"
            columns: ["produtor_id"]
            isOneToOne: false
            referencedRelation: "produtores"
            referencedColumns: ["id"]
          },
        ]
      }
      contratos_compra_terra: {
        Row: {
          cartorio_nome: string | null
          comissao_corretor_pct: number | null
          comprador_produtor_id: string | null
          conta_id: string | null
          contrato_financeiro_id: string | null
          corretor_id: string | null
          created_at: string
          custo_cartorio: number | null
          data_contrato: string | null
          data_entrada: string | null
          data_previsao_escritura: string | null
          data_primeira_parcela: string | null
          escritura_data: string | null
          escritura_numero: string | null
          fazenda_id: string | null
          forma_pagamento: string | null
          id: string
          imovel_area_terra_nua_ha: number | null
          imovel_area_total_ha: number | null
          imovel_car: string | null
          imovel_matricula: string | null
          imovel_municipio: string | null
          imovel_nirf: string | null
          imovel_nome: string
          imovel_uf: string | null
          itbi_pago: boolean | null
          itbi_valor: number | null
          num_parcelas_vendedor: number | null
          numero: string | null
          observacoes: string | null
          periodicidade: string | null
          registro_data: string | null
          registro_numero: string | null
          status: string
          updated_at: string
          valor_benfeitorias: number | null
          valor_entrada: number | null
          valor_terra_nua: number | null
          valor_total: number
          vendedor_id: string | null
        }
        Insert: {
          cartorio_nome?: string | null
          comissao_corretor_pct?: number | null
          comprador_produtor_id?: string | null
          conta_id?: string | null
          contrato_financeiro_id?: string | null
          corretor_id?: string | null
          created_at?: string
          custo_cartorio?: number | null
          data_contrato?: string | null
          data_entrada?: string | null
          data_previsao_escritura?: string | null
          data_primeira_parcela?: string | null
          escritura_data?: string | null
          escritura_numero?: string | null
          fazenda_id?: string | null
          forma_pagamento?: string | null
          id?: string
          imovel_area_terra_nua_ha?: number | null
          imovel_area_total_ha?: number | null
          imovel_car?: string | null
          imovel_matricula?: string | null
          imovel_municipio?: string | null
          imovel_nirf?: string | null
          imovel_nome: string
          imovel_uf?: string | null
          itbi_pago?: boolean | null
          itbi_valor?: number | null
          num_parcelas_vendedor?: number | null
          numero?: string | null
          observacoes?: string | null
          periodicidade?: string | null
          registro_data?: string | null
          registro_numero?: string | null
          status?: string
          updated_at?: string
          valor_benfeitorias?: number | null
          valor_entrada?: number | null
          valor_terra_nua?: number | null
          valor_total: number
          vendedor_id?: string | null
        }
        Update: {
          cartorio_nome?: string | null
          comissao_corretor_pct?: number | null
          comprador_produtor_id?: string | null
          conta_id?: string | null
          contrato_financeiro_id?: string | null
          corretor_id?: string | null
          created_at?: string
          custo_cartorio?: number | null
          data_contrato?: string | null
          data_entrada?: string | null
          data_previsao_escritura?: string | null
          data_primeira_parcela?: string | null
          escritura_data?: string | null
          escritura_numero?: string | null
          fazenda_id?: string | null
          forma_pagamento?: string | null
          id?: string
          imovel_area_terra_nua_ha?: number | null
          imovel_area_total_ha?: number | null
          imovel_car?: string | null
          imovel_matricula?: string | null
          imovel_municipio?: string | null
          imovel_nirf?: string | null
          imovel_nome?: string
          imovel_uf?: string | null
          itbi_pago?: boolean | null
          itbi_valor?: number | null
          num_parcelas_vendedor?: number | null
          numero?: string | null
          observacoes?: string | null
          periodicidade?: string | null
          registro_data?: string | null
          registro_numero?: string | null
          status?: string
          updated_at?: string
          valor_benfeitorias?: number | null
          valor_entrada?: number | null
          valor_terra_nua?: number | null
          valor_total?: number
          vendedor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contratos_compra_terra_comprador_produtor_id_fkey"
            columns: ["comprador_produtor_id"]
            isOneToOne: false
            referencedRelation: "produtores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contratos_compra_terra_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "contas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contratos_compra_terra_contrato_financeiro_id_fkey"
            columns: ["contrato_financeiro_id"]
            isOneToOne: false
            referencedRelation: "contratos_financeiros"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contratos_compra_terra_corretor_id_fkey"
            columns: ["corretor_id"]
            isOneToOne: false
            referencedRelation: "pessoas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contratos_compra_terra_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contratos_compra_terra_vendedor_id_fkey"
            columns: ["vendedor_id"]
            isOneToOne: false
            referencedRelation: "pessoas"
            referencedColumns: ["id"]
          },
        ]
      }
      contratos_financeiros: {
        Row: {
          ano_safra_id: string | null
          carencia_meses: number
          carencia_tipo: string
          codigo: string | null
          conta_liberacao_id: string | null
          conta_pagamento_id: string | null
          cotacao_usd: number | null
          created_at: string | null
          credor: string | null
          crescimento_pct: number | null
          data_contrato: string | null
          data_entrega_produto: string | null
          data_liberacao: string | null
          data_vencimento: string | null
          descricao: string
          estrutura_pagamento: string | null
          fazenda_id: string
          fiscal: boolean
          forma_pagamento: string | null
          id: string
          indexador: string | null
          iof_pct: number | null
          linha_credito: string | null
          local_pagamento: string | null
          moeda: string | null
          numero_contrato: string | null
          numero_documento: string | null
          observacao: string | null
          outros_custos: number | null
          pdf_nome: string | null
          pdf_url: string | null
          periodicidade_meses: number
          periodicidade_pagamento: string | null
          pessoa_id: string | null
          prazo_meses: number | null
          produtor_id: string | null
          rateio_por_vencimento: boolean
          refinanciado_por_id: string | null
          safra_id: string | null
          spread_aa: number | null
          spread_am: number | null
          status: string | null
          tac_valor: number | null
          taxa_juros_aa: number | null
          taxa_juros_am: number | null
          taxa_tipo: string | null
          taxa_variavel_ref: number | null
          tipo: string
          tipo_amortizacao: string | null
          tipo_calculo: string
          valor_cotacao: number | null
          valor_financiado: number | null
          valor_financiado_brl: number | null
          valor_total: number | null
        }
        Insert: {
          ano_safra_id?: string | null
          carencia_meses?: number
          carencia_tipo?: string
          codigo?: string | null
          conta_liberacao_id?: string | null
          conta_pagamento_id?: string | null
          cotacao_usd?: number | null
          created_at?: string | null
          credor?: string | null
          crescimento_pct?: number | null
          data_contrato?: string | null
          data_entrega_produto?: string | null
          data_liberacao?: string | null
          data_vencimento?: string | null
          descricao: string
          estrutura_pagamento?: string | null
          fazenda_id: string
          fiscal?: boolean
          forma_pagamento?: string | null
          id?: string
          indexador?: string | null
          iof_pct?: number | null
          linha_credito?: string | null
          local_pagamento?: string | null
          moeda?: string | null
          numero_contrato?: string | null
          numero_documento?: string | null
          observacao?: string | null
          outros_custos?: number | null
          pdf_nome?: string | null
          pdf_url?: string | null
          periodicidade_meses?: number
          periodicidade_pagamento?: string | null
          pessoa_id?: string | null
          prazo_meses?: number | null
          produtor_id?: string | null
          rateio_por_vencimento?: boolean
          refinanciado_por_id?: string | null
          safra_id?: string | null
          spread_aa?: number | null
          spread_am?: number | null
          status?: string | null
          tac_valor?: number | null
          taxa_juros_aa?: number | null
          taxa_juros_am?: number | null
          taxa_tipo?: string | null
          taxa_variavel_ref?: number | null
          tipo: string
          tipo_amortizacao?: string | null
          tipo_calculo?: string
          valor_cotacao?: number | null
          valor_financiado?: number | null
          valor_financiado_brl?: number | null
          valor_total?: number | null
        }
        Update: {
          ano_safra_id?: string | null
          carencia_meses?: number
          carencia_tipo?: string
          codigo?: string | null
          conta_liberacao_id?: string | null
          conta_pagamento_id?: string | null
          cotacao_usd?: number | null
          created_at?: string | null
          credor?: string | null
          crescimento_pct?: number | null
          data_contrato?: string | null
          data_entrega_produto?: string | null
          data_liberacao?: string | null
          data_vencimento?: string | null
          descricao?: string
          estrutura_pagamento?: string | null
          fazenda_id?: string
          fiscal?: boolean
          forma_pagamento?: string | null
          id?: string
          indexador?: string | null
          iof_pct?: number | null
          linha_credito?: string | null
          local_pagamento?: string | null
          moeda?: string | null
          numero_contrato?: string | null
          numero_documento?: string | null
          observacao?: string | null
          outros_custos?: number | null
          pdf_nome?: string | null
          pdf_url?: string | null
          periodicidade_meses?: number
          periodicidade_pagamento?: string | null
          pessoa_id?: string | null
          prazo_meses?: number | null
          produtor_id?: string | null
          rateio_por_vencimento?: boolean
          refinanciado_por_id?: string | null
          safra_id?: string | null
          spread_aa?: number | null
          spread_am?: number | null
          status?: string | null
          tac_valor?: number | null
          taxa_juros_aa?: number | null
          taxa_juros_am?: number | null
          taxa_tipo?: string | null
          taxa_variavel_ref?: number | null
          tipo?: string
          tipo_amortizacao?: string | null
          tipo_calculo?: string
          valor_cotacao?: number | null
          valor_financiado?: number | null
          valor_financiado_brl?: number | null
          valor_total?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "contratos_financeiros_ano_safra_id_fkey"
            columns: ["ano_safra_id"]
            isOneToOne: false
            referencedRelation: "anos_safra"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contratos_financeiros_conta_liberacao_id_fkey"
            columns: ["conta_liberacao_id"]
            isOneToOne: false
            referencedRelation: "contas_bancarias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contratos_financeiros_conta_pagamento_id_fkey"
            columns: ["conta_pagamento_id"]
            isOneToOne: false
            referencedRelation: "contas_bancarias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contratos_financeiros_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contratos_financeiros_pessoa_id_fkey"
            columns: ["pessoa_id"]
            isOneToOne: false
            referencedRelation: "pessoas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contratos_financeiros_produtor_id_fkey"
            columns: ["produtor_id"]
            isOneToOne: false
            referencedRelation: "produtores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contratos_financeiros_refinanciado_por_id_fkey"
            columns: ["refinanciado_por_id"]
            isOneToOne: false
            referencedRelation: "contratos_financeiros"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contratos_financeiros_safra_id_fkey"
            columns: ["safra_id"]
            isOneToOne: false
            referencedRelation: "ciclos"
            referencedColumns: ["id"]
          },
        ]
      }
      contratos_refinanciamento: {
        Row: {
          contrato_novo_id: string
          contrato_origem_id: string
          created_at: string | null
          fazenda_id: string | null
          id: string
          saldo_incorporado: number | null
        }
        Insert: {
          contrato_novo_id: string
          contrato_origem_id: string
          created_at?: string | null
          fazenda_id?: string | null
          id?: string
          saldo_incorporado?: number | null
        }
        Update: {
          contrato_novo_id?: string
          contrato_origem_id?: string
          created_at?: string | null
          fazenda_id?: string | null
          id?: string
          saldo_incorporado?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "contratos_refinanciamento_contrato_novo_id_fkey"
            columns: ["contrato_novo_id"]
            isOneToOne: false
            referencedRelation: "contratos_financeiros"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contratos_refinanciamento_contrato_origem_id_fkey"
            columns: ["contrato_origem_id"]
            isOneToOne: false
            referencedRelation: "contratos_financeiros"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contratos_refinanciamento_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      controller_alertas: {
        Row: {
          acknowledged_at: string | null
          acknowledged_by: string | null
          affected_id: string | null
          affected_module: string | null
          categoria: string
          check_key: string
          created_at: string | null
          descricao: string
          fazenda_id: string
          first_seen_at: string | null
          id: string
          resolved_at: string | null
          severidade: string
          suggested_action: string | null
          titulo: string
        }
        Insert: {
          acknowledged_at?: string | null
          acknowledged_by?: string | null
          affected_id?: string | null
          affected_module?: string | null
          categoria: string
          check_key: string
          created_at?: string | null
          descricao: string
          fazenda_id: string
          first_seen_at?: string | null
          id?: string
          resolved_at?: string | null
          severidade: string
          suggested_action?: string | null
          titulo: string
        }
        Update: {
          acknowledged_at?: string | null
          acknowledged_by?: string | null
          affected_id?: string | null
          affected_module?: string | null
          categoria?: string
          check_key?: string
          created_at?: string | null
          descricao?: string
          fazenda_id?: string
          first_seen_at?: string | null
          id?: string
          resolved_at?: string | null
          severidade?: string
          suggested_action?: string | null
          titulo?: string
        }
        Relationships: [
          {
            foreignKeyName: "controller_alertas_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      correcoes_solo: {
        Row: {
          aprovado_em: string | null
          aprovado_por_perfil_id: string | null
          area_ha: number
          ciclo_id: string | null
          created_at: string | null
          custo_total: number | null
          data_aplicacao: string
          fazenda_id: string
          finalidade: string
          id: string
          lancado_por_perfil_id: string | null
          lancamento_id: string | null
          maquina_id: string | null
          motivo_rejeicao: string | null
          observacao: string | null
          origem_lancamento: string
          safra_id: string | null
          status_campo: string
          talhao_id: string | null
        }
        Insert: {
          aprovado_em?: string | null
          aprovado_por_perfil_id?: string | null
          area_ha: number
          ciclo_id?: string | null
          created_at?: string | null
          custo_total?: number | null
          data_aplicacao: string
          fazenda_id: string
          finalidade?: string
          id?: string
          lancado_por_perfil_id?: string | null
          lancamento_id?: string | null
          maquina_id?: string | null
          motivo_rejeicao?: string | null
          observacao?: string | null
          origem_lancamento?: string
          safra_id?: string | null
          status_campo?: string
          talhao_id?: string | null
        }
        Update: {
          aprovado_em?: string | null
          aprovado_por_perfil_id?: string | null
          area_ha?: number
          ciclo_id?: string | null
          created_at?: string | null
          custo_total?: number | null
          data_aplicacao?: string
          fazenda_id?: string
          finalidade?: string
          id?: string
          lancado_por_perfil_id?: string | null
          lancamento_id?: string | null
          maquina_id?: string | null
          motivo_rejeicao?: string | null
          observacao?: string | null
          origem_lancamento?: string
          safra_id?: string | null
          status_campo?: string
          talhao_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "correcoes_solo_aprovado_por_perfil_id_fkey"
            columns: ["aprovado_por_perfil_id"]
            isOneToOne: false
            referencedRelation: "perfis"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "correcoes_solo_ciclo_id_fkey"
            columns: ["ciclo_id"]
            isOneToOne: false
            referencedRelation: "ciclos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "correcoes_solo_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "correcoes_solo_lancado_por_perfil_id_fkey"
            columns: ["lancado_por_perfil_id"]
            isOneToOne: false
            referencedRelation: "perfis"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "correcoes_solo_maquina_id_fkey"
            columns: ["maquina_id"]
            isOneToOne: false
            referencedRelation: "maquinas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "correcoes_solo_safra_id_fkey"
            columns: ["safra_id"]
            isOneToOne: false
            referencedRelation: "safras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "correcoes_solo_talhao_id_fkey"
            columns: ["talhao_id"]
            isOneToOne: false
            referencedRelation: "talhoes"
            referencedColumns: ["id"]
          },
        ]
      }
      correcoes_solo_itens: {
        Row: {
          correcao_id: string
          created_at: string | null
          custo_total: number | null
          dose_ton_ha: number | null
          dose_ton_ha_recomendada: number | null
          fazenda_id: string
          id: string
          insumo_id: string | null
          produto_nome: string | null
          quantidade_ton: number | null
          valor_unitario: number | null
        }
        Insert: {
          correcao_id: string
          created_at?: string | null
          custo_total?: number | null
          dose_ton_ha?: number | null
          dose_ton_ha_recomendada?: number | null
          fazenda_id: string
          id?: string
          insumo_id?: string | null
          produto_nome?: string | null
          quantidade_ton?: number | null
          valor_unitario?: number | null
        }
        Update: {
          correcao_id?: string
          created_at?: string | null
          custo_total?: number | null
          dose_ton_ha?: number | null
          dose_ton_ha_recomendada?: number | null
          fazenda_id?: string
          id?: string
          insumo_id?: string | null
          produto_nome?: string | null
          quantidade_ton?: number | null
          valor_unitario?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "correcoes_solo_itens_correcao_id_fkey"
            columns: ["correcao_id"]
            isOneToOne: false
            referencedRelation: "correcoes_solo"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "correcoes_solo_itens_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "correcoes_solo_itens_insumo_id_fkey"
            columns: ["insumo_id"]
            isOneToOne: false
            referencedRelation: "insumos"
            referencedColumns: ["id"]
          },
        ]
      }
      cte_recebidos: {
        Row: {
          ambiente: string
          chave_acesso: string | null
          created_at: string
          data_emissao: string | null
          destinatario_cnpj: string | null
          destinatario_nome: string | null
          emitente_cnpj: string | null
          emitente_nome: string | null
          fazenda_id: string
          id: string
          lido: boolean
          municipio_destino: string | null
          municipio_origem: string | null
          nsu: string
          numero_cte: number | null
          produto_descricao: string | null
          remetente_cnpj: string | null
          remetente_nome: string | null
          schema_sefaz: string | null
          serie: number | null
          uf_destino: string | null
          uf_origem: string | null
          valor_frete: number | null
          valor_mercadoria: number | null
          xml_raw: string | null
        }
        Insert: {
          ambiente?: string
          chave_acesso?: string | null
          created_at?: string
          data_emissao?: string | null
          destinatario_cnpj?: string | null
          destinatario_nome?: string | null
          emitente_cnpj?: string | null
          emitente_nome?: string | null
          fazenda_id: string
          id?: string
          lido?: boolean
          municipio_destino?: string | null
          municipio_origem?: string | null
          nsu: string
          numero_cte?: number | null
          produto_descricao?: string | null
          remetente_cnpj?: string | null
          remetente_nome?: string | null
          schema_sefaz?: string | null
          serie?: number | null
          uf_destino?: string | null
          uf_origem?: string | null
          valor_frete?: number | null
          valor_mercadoria?: number | null
          xml_raw?: string | null
        }
        Update: {
          ambiente?: string
          chave_acesso?: string | null
          created_at?: string
          data_emissao?: string | null
          destinatario_cnpj?: string | null
          destinatario_nome?: string | null
          emitente_cnpj?: string | null
          emitente_nome?: string | null
          fazenda_id?: string
          id?: string
          lido?: boolean
          municipio_destino?: string | null
          municipio_origem?: string | null
          nsu?: string
          numero_cte?: number | null
          produto_descricao?: string | null
          remetente_cnpj?: string | null
          remetente_nome?: string | null
          schema_sefaz?: string | null
          serie?: number | null
          uf_destino?: string | null
          uf_origem?: string | null
          valor_frete?: number | null
          valor_mercadoria?: number | null
          xml_raw?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cte_recebidos_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      ctes: {
        Row: {
          aliquota_icms: number
          base_calc_icms: number
          carregamento_id: string | null
          cfop: string
          chave_acesso: string | null
          created_at: string | null
          data_emissao: string
          destinatario_cnpj: string | null
          destinatario_id: string | null
          destinatario_ie: string | null
          destinatario_nome: string
          emitente_cnpj: string | null
          emitente_id: string | null
          emitente_razao_social: string | null
          fazenda_id: string
          ibge_destino: string | null
          ibge_origem: string | null
          id: string
          motorista_cpf: string | null
          motorista_id: string | null
          motorista_nome: string
          municipio_destino: string
          municipio_origem: string
          natureza_operacao: string
          ncm: string | null
          nfe_chave: string | null
          numero_cte: string
          observacao: string | null
          peso_bruto_kg: number
          peso_liquido_kg: number
          produto_descricao: string
          quantidade: number
          remetente_cnpj: string | null
          remetente_id: string | null
          remetente_ie: string | null
          remetente_nome: string
          serie: string
          status: string
          tomador_tipo: string
          uf_destino: string
          uf_origem: string
          unidade: string
          valor_frete: number
          valor_icms: number
          valor_mercadoria: number
          veiculo_id: string | null
          veiculo_placa: string
          veiculo_tipo: string | null
        }
        Insert: {
          aliquota_icms?: number
          base_calc_icms?: number
          carregamento_id?: string | null
          cfop?: string
          chave_acesso?: string | null
          created_at?: string | null
          data_emissao: string
          destinatario_cnpj?: string | null
          destinatario_id?: string | null
          destinatario_ie?: string | null
          destinatario_nome?: string
          emitente_cnpj?: string | null
          emitente_id?: string | null
          emitente_razao_social?: string | null
          fazenda_id: string
          ibge_destino?: string | null
          ibge_origem?: string | null
          id?: string
          motorista_cpf?: string | null
          motorista_id?: string | null
          motorista_nome?: string
          municipio_destino?: string
          municipio_origem?: string
          natureza_operacao?: string
          ncm?: string | null
          nfe_chave?: string | null
          numero_cte: string
          observacao?: string | null
          peso_bruto_kg?: number
          peso_liquido_kg?: number
          produto_descricao?: string
          quantidade?: number
          remetente_cnpj?: string | null
          remetente_id?: string | null
          remetente_ie?: string | null
          remetente_nome?: string
          serie?: string
          status?: string
          tomador_tipo?: string
          uf_destino?: string
          uf_origem?: string
          unidade?: string
          valor_frete?: number
          valor_icms?: number
          valor_mercadoria?: number
          veiculo_id?: string | null
          veiculo_placa?: string
          veiculo_tipo?: string | null
        }
        Update: {
          aliquota_icms?: number
          base_calc_icms?: number
          carregamento_id?: string | null
          cfop?: string
          chave_acesso?: string | null
          created_at?: string | null
          data_emissao?: string
          destinatario_cnpj?: string | null
          destinatario_id?: string | null
          destinatario_ie?: string | null
          destinatario_nome?: string
          emitente_cnpj?: string | null
          emitente_id?: string | null
          emitente_razao_social?: string | null
          fazenda_id?: string
          ibge_destino?: string | null
          ibge_origem?: string | null
          id?: string
          motorista_cpf?: string | null
          motorista_id?: string | null
          motorista_nome?: string
          municipio_destino?: string
          municipio_origem?: string
          natureza_operacao?: string
          ncm?: string | null
          nfe_chave?: string | null
          numero_cte?: string
          observacao?: string | null
          peso_bruto_kg?: number
          peso_liquido_kg?: number
          produto_descricao?: string
          quantidade?: number
          remetente_cnpj?: string | null
          remetente_id?: string | null
          remetente_ie?: string | null
          remetente_nome?: string
          serie?: string
          status?: string
          tomador_tipo?: string
          uf_destino?: string
          uf_origem?: string
          unidade?: string
          valor_frete?: number
          valor_icms?: number
          valor_mercadoria?: number
          veiculo_id?: string | null
          veiculo_placa?: string
          veiculo_tipo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ctes_carregamento_id_fkey"
            columns: ["carregamento_id"]
            isOneToOne: false
            referencedRelation: "cargas_expedicao"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ctes_destinatario_id_fkey"
            columns: ["destinatario_id"]
            isOneToOne: false
            referencedRelation: "pessoas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ctes_emitente_id_fkey"
            columns: ["emitente_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ctes_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ctes_motorista_id_fkey"
            columns: ["motorista_id"]
            isOneToOne: false
            referencedRelation: "motoristas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ctes_remetente_id_fkey"
            columns: ["remetente_id"]
            isOneToOne: false
            referencedRelation: "pessoas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ctes_veiculo_id_fkey"
            columns: ["veiculo_id"]
            isOneToOne: false
            referencedRelation: "veiculos"
            referencedColumns: ["id"]
          },
        ]
      }
      culturas: {
        Row: {
          ativa: boolean
          categoria: string
          created_at: string | null
          fator_conversao_kg: number | null
          fazenda_id: string
          id: string
          ncm: string | null
          nome: string
          observacao: string | null
          ordem: number | null
          unidade: string
        }
        Insert: {
          ativa?: boolean
          categoria?: string
          created_at?: string | null
          fator_conversao_kg?: number | null
          fazenda_id: string
          id?: string
          ncm?: string | null
          nome: string
          observacao?: string | null
          ordem?: number | null
          unidade?: string
        }
        Update: {
          ativa?: boolean
          categoria?: string
          created_at?: string | null
          fator_conversao_kg?: number | null
          fazenda_id?: string
          id?: string
          ncm?: string | null
          nome?: string
          observacao?: string | null
          ordem?: number | null
          unidade?: string
        }
        Relationships: [
          {
            foreignKeyName: "culturas_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      curva_mercado: {
        Row: {
          boletim: string | null
          created_at: string | null
          data_captura: string | null
          data_referencia: string
          fazenda_id: string | null
          fonte: string | null
          id: string
          instrumento: string
          revisao: number | null
          unidade: string
          valor: number
          vencimento: string | null
        }
        Insert: {
          boletim?: string | null
          created_at?: string | null
          data_captura?: string | null
          data_referencia: string
          fazenda_id?: string | null
          fonte?: string | null
          id?: string
          instrumento: string
          revisao?: number | null
          unidade: string
          valor: number
          vencimento?: string | null
        }
        Update: {
          boletim?: string | null
          created_at?: string | null
          data_captura?: string | null
          data_referencia?: string
          fazenda_id?: string | null
          fonte?: string | null
          id?: string
          instrumento?: string
          revisao?: number | null
          unidade?: string
          valor?: number
          vencimento?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "curva_mercado_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      depositos: {
        Row: {
          ativo: boolean
          capacidade_sc: number | null
          created_at: string | null
          descricao: string | null
          fazenda_id: string
          id: string
          nome: string
          pessoa_id: string | null
          tipo: string
        }
        Insert: {
          ativo?: boolean
          capacidade_sc?: number | null
          created_at?: string | null
          descricao?: string | null
          fazenda_id: string
          id?: string
          nome: string
          pessoa_id?: string | null
          tipo: string
        }
        Update: {
          ativo?: boolean
          capacidade_sc?: number | null
          created_at?: string | null
          descricao?: string | null
          fazenda_id?: string
          id?: string
          nome?: string
          pessoa_id?: string | null
          tipo?: string
        }
        Relationships: [
          {
            foreignKeyName: "depositos_pessoa_id_fkey"
            columns: ["pessoa_id"]
            isOneToOne: false
            referencedRelation: "pessoas"
            referencedColumns: ["id"]
          },
        ]
      }
      documentos_anexos: {
        Row: {
          conta_id: string
          created_at: string
          criado_por: string | null
          entidade_id: string
          entidade_tipo: string
          fazenda_id: string | null
          id: string
          mime_type: string | null
          nome_original: string
          storage_path: string
          tamanho_bytes: number
        }
        Insert: {
          conta_id: string
          created_at?: string
          criado_por?: string | null
          entidade_id: string
          entidade_tipo: string
          fazenda_id?: string | null
          id?: string
          mime_type?: string | null
          nome_original: string
          storage_path: string
          tamanho_bytes?: number
        }
        Update: {
          conta_id?: string
          created_at?: string
          criado_por?: string | null
          entidade_id?: string
          entidade_tipo?: string
          fazenda_id?: string | null
          id?: string
          mime_type?: string | null
          nome_original?: string
          storage_path?: string
          tamanho_bytes?: number
        }
        Relationships: [
          {
            foreignKeyName: "documentos_anexos_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "contas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documentos_anexos_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      empresa_lancamentos: {
        Row: {
          categoria: string | null
          centro_custo: string | null
          competencia: string | null
          conciliado: boolean | null
          conta_bancaria: string | null
          cotacao_usd: number | null
          created_at: string | null
          data_pagamento: string | null
          data_vencimento: string
          descricao: string
          empresa_id: string
          fazenda_id: string
          folha_id: string | null
          forma_pagamento: string | null
          id: string
          moeda: string
          nf_entrada_id: string | null
          numero: number
          numero_documento: string | null
          observacao: string | null
          origem: string | null
          pessoa_id: string | null
          status: string
          tipo: string
          valor: number
          valor_pago: number | null
        }
        Insert: {
          categoria?: string | null
          centro_custo?: string | null
          competencia?: string | null
          conciliado?: boolean | null
          conta_bancaria?: string | null
          cotacao_usd?: number | null
          created_at?: string | null
          data_pagamento?: string | null
          data_vencimento: string
          descricao: string
          empresa_id: string
          fazenda_id: string
          folha_id?: string | null
          forma_pagamento?: string | null
          id?: string
          moeda?: string
          nf_entrada_id?: string | null
          numero?: never
          numero_documento?: string | null
          observacao?: string | null
          origem?: string | null
          pessoa_id?: string | null
          status?: string
          tipo: string
          valor?: number
          valor_pago?: number | null
        }
        Update: {
          categoria?: string | null
          centro_custo?: string | null
          competencia?: string | null
          conciliado?: boolean | null
          conta_bancaria?: string | null
          cotacao_usd?: number | null
          created_at?: string | null
          data_pagamento?: string | null
          data_vencimento?: string
          descricao?: string
          empresa_id?: string
          fazenda_id?: string
          folha_id?: string | null
          forma_pagamento?: string | null
          id?: string
          moeda?: string
          nf_entrada_id?: string | null
          numero?: never
          numero_documento?: string | null
          observacao?: string | null
          origem?: string | null
          pessoa_id?: string | null
          status?: string
          tipo?: string
          valor?: number
          valor_pago?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "empresa_lancamentos_conta_bancaria_fkey"
            columns: ["conta_bancaria"]
            isOneToOne: false
            referencedRelation: "contas_bancarias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "empresa_lancamentos_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "empresa_lancamentos_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "empresa_lancamentos_folha_id_fkey"
            columns: ["folha_id"]
            isOneToOne: false
            referencedRelation: "folha_pagamento"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "empresa_lancamentos_nf_entrada_id_fkey"
            columns: ["nf_entrada_id"]
            isOneToOne: false
            referencedRelation: "nf_entradas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "empresa_lancamentos_pessoa_id_fkey"
            columns: ["pessoa_id"]
            isOneToOne: false
            referencedRelation: "pessoas"
            referencedColumns: ["id"]
          },
        ]
      }
      empresas: {
        Row: {
          ambiente_fiscal: string | null
          bairro: string | null
          car: string | null
          cep: string | null
          cert_a1_nome: string | null
          cert_a1_senha: string | null
          cert_a1_url: string | null
          cert_a1_validade: string | null
          complemento: string | null
          cpf_cnpj: string | null
          created_at: string | null
          crt: string | null
          email: string | null
          email_relatorios: string | null
          estado: string | null
          fazenda_id: string
          finalidades: string[]
          id: string
          inscricao_est: string | null
          itr: string | null
          logradouro: string | null
          municipio: string | null
          municipio_ibge: string | null
          nirf: string | null
          nome: string
          numero: string | null
          produtor_id: string | null
          razao_social: string | null
          regime_tributario: string | null
          rntrc: string | null
          serie_cte: string | null
          serie_mdfe: string | null
          serie_nfe: string | null
          telefone: string | null
          tipo: string
          tipo_empresa: string | null
        }
        Insert: {
          ambiente_fiscal?: string | null
          bairro?: string | null
          car?: string | null
          cep?: string | null
          cert_a1_nome?: string | null
          cert_a1_senha?: string | null
          cert_a1_url?: string | null
          cert_a1_validade?: string | null
          complemento?: string | null
          cpf_cnpj?: string | null
          created_at?: string | null
          crt?: string | null
          email?: string | null
          email_relatorios?: string | null
          estado?: string | null
          fazenda_id: string
          finalidades?: string[]
          id?: string
          inscricao_est?: string | null
          itr?: string | null
          logradouro?: string | null
          municipio?: string | null
          municipio_ibge?: string | null
          nirf?: string | null
          nome: string
          numero?: string | null
          produtor_id?: string | null
          razao_social?: string | null
          regime_tributario?: string | null
          rntrc?: string | null
          serie_cte?: string | null
          serie_mdfe?: string | null
          serie_nfe?: string | null
          telefone?: string | null
          tipo: string
          tipo_empresa?: string | null
        }
        Update: {
          ambiente_fiscal?: string | null
          bairro?: string | null
          car?: string | null
          cep?: string | null
          cert_a1_nome?: string | null
          cert_a1_senha?: string | null
          cert_a1_url?: string | null
          cert_a1_validade?: string | null
          complemento?: string | null
          cpf_cnpj?: string | null
          created_at?: string | null
          crt?: string | null
          email?: string | null
          email_relatorios?: string | null
          estado?: string | null
          fazenda_id?: string
          finalidades?: string[]
          id?: string
          inscricao_est?: string | null
          itr?: string | null
          logradouro?: string | null
          municipio?: string | null
          municipio_ibge?: string | null
          nirf?: string | null
          nome?: string
          numero?: string | null
          produtor_id?: string | null
          razao_social?: string | null
          regime_tributario?: string | null
          rntrc?: string | null
          serie_cte?: string | null
          serie_mdfe?: string | null
          serie_nfe?: string | null
          telefone?: string | null
          tipo?: string
          tipo_empresa?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "empresas_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "empresas_produtor_id_fkey"
            columns: ["produtor_id"]
            isOneToOne: false
            referencedRelation: "produtores"
            referencedColumns: ["id"]
          },
        ]
      }
      empresas_aplicadoras: {
        Row: {
          ativo: boolean | null
          cloa_numero: string | null
          cloa_vencimento: string | null
          cnpj: string | null
          conta_id: string | null
          crea: string | null
          created_at: string | null
          email: string | null
          fazenda_id: string | null
          id: string
          observacao: string | null
          razao_social: string
          responsavel_tecnico: string | null
          telefone: string | null
        }
        Insert: {
          ativo?: boolean | null
          cloa_numero?: string | null
          cloa_vencimento?: string | null
          cnpj?: string | null
          conta_id?: string | null
          crea?: string | null
          created_at?: string | null
          email?: string | null
          fazenda_id?: string | null
          id?: string
          observacao?: string | null
          razao_social: string
          responsavel_tecnico?: string | null
          telefone?: string | null
        }
        Update: {
          ativo?: boolean | null
          cloa_numero?: string | null
          cloa_vencimento?: string | null
          cnpj?: string | null
          conta_id?: string | null
          crea?: string | null
          created_at?: string | null
          email?: string | null
          fazenda_id?: string | null
          id?: string
          observacao?: string | null
          razao_social?: string
          responsavel_tecnico?: string | null
          telefone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "empresas_aplicadoras_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "contas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "empresas_aplicadoras_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      esocial_eventos: {
        Row: {
          codigo_evento: string
          competencia: string | null
          created_at: string | null
          descricao_evento: string | null
          erro_descricao: string | null
          fazenda_id: string
          id: string
          protocolo: string | null
          recibo: string | null
          status: string
          trabalhador_id: string | null
          xml_gerado: string | null
        }
        Insert: {
          codigo_evento: string
          competencia?: string | null
          created_at?: string | null
          descricao_evento?: string | null
          erro_descricao?: string | null
          fazenda_id: string
          id?: string
          protocolo?: string | null
          recibo?: string | null
          status?: string
          trabalhador_id?: string | null
          xml_gerado?: string | null
        }
        Update: {
          codigo_evento?: string
          competencia?: string | null
          created_at?: string | null
          descricao_evento?: string | null
          erro_descricao?: string | null
          fazenda_id?: string
          id?: string
          protocolo?: string | null
          recibo?: string | null
          status?: string
          trabalhador_id?: string | null
          xml_gerado?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "esocial_eventos_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      esocial_trabalhadores: {
        Row: {
          cpf: string | null
          created_at: string | null
          data_admissao: string | null
          data_demissao: string | null
          data_nascimento: string | null
          fazenda_id: string
          funcao: string | null
          id: string
          nome: string
          pis: string | null
          salario_base: number | null
          status: string
          tipo_vinculo: string
        }
        Insert: {
          cpf?: string | null
          created_at?: string | null
          data_admissao?: string | null
          data_demissao?: string | null
          data_nascimento?: string | null
          fazenda_id: string
          funcao?: string | null
          id?: string
          nome: string
          pis?: string | null
          salario_base?: number | null
          status?: string
          tipo_vinculo?: string
        }
        Update: {
          cpf?: string | null
          created_at?: string | null
          data_admissao?: string | null
          data_demissao?: string | null
          data_nascimento?: string | null
          fazenda_id?: string
          funcao?: string | null
          id?: string
          nome?: string
          pis?: string | null
          salario_base?: number | null
          status?: string
          tipo_vinculo?: string
        }
        Relationships: [
          {
            foreignKeyName: "esocial_trabalhadores_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      estoque_terceiros: {
        Row: {
          created_at: string | null
          deposito_id: string | null
          descricao: string
          fazenda_id: string
          id: string
          insumo_id: string | null
          nf_entrada_id: string | null
          quantidade_original: number
          quantidade_saldo: number
          safra: string | null
          status: string
          terceiro_cnpj: string | null
          terceiro_nome: string
        }
        Insert: {
          created_at?: string | null
          deposito_id?: string | null
          descricao: string
          fazenda_id: string
          id?: string
          insumo_id?: string | null
          nf_entrada_id?: string | null
          quantidade_original: number
          quantidade_saldo: number
          safra?: string | null
          status?: string
          terceiro_cnpj?: string | null
          terceiro_nome: string
        }
        Update: {
          created_at?: string | null
          deposito_id?: string | null
          descricao?: string
          fazenda_id?: string
          id?: string
          insumo_id?: string | null
          nf_entrada_id?: string | null
          quantidade_original?: number
          quantidade_saldo?: number
          safra?: string | null
          status?: string
          terceiro_cnpj?: string | null
          terceiro_nome?: string
        }
        Relationships: [
          {
            foreignKeyName: "estoque_terceiros_deposito_id_fkey"
            columns: ["deposito_id"]
            isOneToOne: false
            referencedRelation: "depositos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "estoque_terceiros_insumo_id_fkey"
            columns: ["insumo_id"]
            isOneToOne: false
            referencedRelation: "insumos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "estoque_terceiros_nf_entrada_id_fkey"
            columns: ["nf_entrada_id"]
            isOneToOne: false
            referencedRelation: "nf_entradas"
            referencedColumns: ["id"]
          },
        ]
      }
      estrutura_despesa_hedge: {
        Row: {
          ativo: boolean | null
          created_at: string | null
          cultura: string | null
          descricao: string
          destino: string | null
          fazenda_id: string | null
          id: string
          origem: string | null
          tipo: string
          valor_brl_sc: number
          vigencia_fim: string | null
          vigencia_inicio: string | null
        }
        Insert: {
          ativo?: boolean | null
          created_at?: string | null
          cultura?: string | null
          descricao: string
          destino?: string | null
          fazenda_id?: string | null
          id?: string
          origem?: string | null
          tipo: string
          valor_brl_sc: number
          vigencia_fim?: string | null
          vigencia_inicio?: string | null
        }
        Update: {
          ativo?: boolean | null
          created_at?: string | null
          cultura?: string | null
          descricao?: string
          destino?: string | null
          fazenda_id?: string | null
          id?: string
          origem?: string | null
          tipo?: string
          valor_brl_sc?: number
          vigencia_fim?: string | null
          vigencia_inicio?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "estrutura_despesa_hedge_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      extratos_bancarios: {
        Row: {
          conciliados: number | null
          conta_id: string | null
          conta_nome: string | null
          created_at: string | null
          data_fim: string | null
          data_importacao: string | null
          data_inicio: string | null
          fazenda_id: string
          id: string
          linhas: Json
          ofx_storage_path: string | null
          pendentes: number | null
          total_linhas: number | null
          usuario_nome: string | null
        }
        Insert: {
          conciliados?: number | null
          conta_id?: string | null
          conta_nome?: string | null
          created_at?: string | null
          data_fim?: string | null
          data_importacao?: string | null
          data_inicio?: string | null
          fazenda_id: string
          id: string
          linhas?: Json
          ofx_storage_path?: string | null
          pendentes?: number | null
          total_linhas?: number | null
          usuario_nome?: string | null
        }
        Update: {
          conciliados?: number | null
          conta_id?: string | null
          conta_nome?: string | null
          created_at?: string | null
          data_fim?: string | null
          data_importacao?: string | null
          data_inicio?: string | null
          fazenda_id?: string
          id?: string
          linhas?: Json
          ofx_storage_path?: string | null
          pendentes?: number | null
          total_linhas?: number | null
          usuario_nome?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "extratos_bancarios_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "contas_bancarias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "extratos_bancarios_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      faturas_cartao: {
        Row: {
          ano: number
          cartao_id: string
          conta_id: string | null
          created_at: string
          data_fechamento: string
          data_vencimento: string
          fazenda_id: string | null
          id: string
          lancamento_cp_id: string | null
          mes: number
          status: string
          valor_total: number
        }
        Insert: {
          ano: number
          cartao_id: string
          conta_id?: string | null
          created_at?: string
          data_fechamento: string
          data_vencimento: string
          fazenda_id?: string | null
          id?: string
          lancamento_cp_id?: string | null
          mes: number
          status?: string
          valor_total?: number
        }
        Update: {
          ano?: number
          cartao_id?: string
          conta_id?: string | null
          created_at?: string
          data_fechamento?: string
          data_vencimento?: string
          fazenda_id?: string | null
          id?: string
          lancamento_cp_id?: string | null
          mes?: number
          status?: string
          valor_total?: number
        }
        Relationships: [
          {
            foreignKeyName: "faturas_cartao_cartao_id_fkey"
            columns: ["cartao_id"]
            isOneToOne: false
            referencedRelation: "cartoes_credito"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "faturas_cartao_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "contas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "faturas_cartao_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "faturas_cartao_lancamento_cp_id_fkey"
            columns: ["lancamento_cp_id"]
            isOneToOne: false
            referencedRelation: "lancamentos"
            referencedColumns: ["id"]
          },
        ]
      }
      faturas_fornecedor: {
        Row: {
          competencia: string
          conta_pagamento: string | null
          created_at: string | null
          data_pagamento: string | null
          fazenda_id: string
          fornecedor_nome: string | null
          id: string
          numero_fatura: string | null
          observacao: string | null
          pessoa_id: string | null
          status: string
          valor_cp: number
          valor_total: number
          vencimento: string | null
        }
        Insert: {
          competencia: string
          conta_pagamento?: string | null
          created_at?: string | null
          data_pagamento?: string | null
          fazenda_id: string
          fornecedor_nome?: string | null
          id?: string
          numero_fatura?: string | null
          observacao?: string | null
          pessoa_id?: string | null
          status?: string
          valor_cp?: number
          valor_total?: number
          vencimento?: string | null
        }
        Update: {
          competencia?: string
          conta_pagamento?: string | null
          created_at?: string | null
          data_pagamento?: string | null
          fazenda_id?: string
          fornecedor_nome?: string | null
          id?: string
          numero_fatura?: string | null
          observacao?: string | null
          pessoa_id?: string | null
          status?: string
          valor_cp?: number
          valor_total?: number
          vencimento?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "faturas_fornecedor_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "faturas_fornecedor_pessoa_id_fkey"
            columns: ["pessoa_id"]
            isOneToOne: false
            referencedRelation: "pessoas"
            referencedColumns: ["id"]
          },
        ]
      }
      fazenda_cars: {
        Row: {
          area_ha: number | null
          area_preservada_ha: number | null
          created_at: string | null
          data_aprovacao: string | null
          data_inscricao: string | null
          estado: string
          fazenda_id: string
          id: string
          municipio: string | null
          numero: string
          observacao: string | null
          status: string
        }
        Insert: {
          area_ha?: number | null
          area_preservada_ha?: number | null
          created_at?: string | null
          data_aprovacao?: string | null
          data_inscricao?: string | null
          estado: string
          fazenda_id: string
          id?: string
          municipio?: string | null
          numero: string
          observacao?: string | null
          status?: string
        }
        Update: {
          area_ha?: number | null
          area_preservada_ha?: number | null
          created_at?: string | null
          data_aprovacao?: string | null
          data_inscricao?: string | null
          estado?: string
          fazenda_id?: string
          id?: string
          municipio?: string | null
          numero?: string
          observacao?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "fazenda_cars_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      fazenda_ccirs: {
        Row: {
          area_ha: number | null
          created_at: string | null
          exercicio: string | null
          fazenda_id: string
          id: string
          modulo_fiscal: number | null
          numero: string
          observacao: string | null
          situacao: string
          vencimento: string | null
        }
        Insert: {
          area_ha?: number | null
          created_at?: string | null
          exercicio?: string | null
          fazenda_id: string
          id?: string
          modulo_fiscal?: number | null
          numero: string
          observacao?: string | null
          situacao?: string
          vencimento?: string | null
        }
        Update: {
          area_ha?: number | null
          created_at?: string | null
          exercicio?: string | null
          fazenda_id?: string
          id?: string
          modulo_fiscal?: number | null
          numero?: string
          observacao?: string | null
          situacao?: string
          vencimento?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fazenda_ccirs_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      fazenda_itrs: {
        Row: {
          area_tributavel_ha: number | null
          created_at: string | null
          exercicio: string
          fazenda_id: string
          id: string
          nirf_numero: string | null
          numero_declaracao: string | null
          observacao: string | null
          status_pagamento: string
          valor_apurado: number | null
          vencimento: string | null
        }
        Insert: {
          area_tributavel_ha?: number | null
          created_at?: string | null
          exercicio: string
          fazenda_id: string
          id?: string
          nirf_numero?: string | null
          numero_declaracao?: string | null
          observacao?: string | null
          status_pagamento?: string
          valor_apurado?: number | null
          vencimento?: string | null
        }
        Update: {
          area_tributavel_ha?: number | null
          created_at?: string | null
          exercicio?: string
          fazenda_id?: string
          id?: string
          nirf_numero?: string | null
          numero_declaracao?: string | null
          observacao?: string | null
          status_pagamento?: string
          valor_apurado?: number | null
          vencimento?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fazenda_itrs_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      fazenda_nirfs: {
        Row: {
          area_ha: number | null
          created_at: string | null
          fazenda_id: string
          id: string
          numero: string
          observacao: string | null
          situacao: string
        }
        Insert: {
          area_ha?: number | null
          created_at?: string | null
          fazenda_id: string
          id?: string
          numero: string
          observacao?: string | null
          situacao?: string
        }
        Update: {
          area_ha?: number | null
          created_at?: string | null
          fazenda_id?: string
          id?: string
          numero?: string
          observacao?: string | null
          situacao?: string
        }
        Relationships: [
          {
            foreignKeyName: "fazenda_nirfs_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      fazendas: {
        Row: {
          area_total_ha: number
          arrendada: boolean | null
          arrendamento_area_ha: number | null
          arrendamento_inicio: string | null
          arrendamento_proprietario: string | null
          arrendamento_renovacao_auto: boolean | null
          arrendamento_valor_brl_ha: number | null
          arrendamento_valor_sc_ha: number | null
          arrendamento_vencimento: string | null
          bairro: string | null
          caepf: string | null
          car: string | null
          car_vencimento: string | null
          ccir: string | null
          ccir_vencimento: string | null
          cep: string | null
          cnpj: string | null
          complemento: string | null
          conta_id: string | null
          cpf_cnpj_fiscal: string | null
          created_at: string | null
          empresa_id: string | null
          entidade_contabil: string | null
          estado: string
          id: string
          itr: string | null
          itr_vencimento: string | null
          logradouro: string | null
          municipio: string
          municipio_ibge: string | null
          nirf: string | null
          nome: string
          numero_end: string | null
          owner_user_id: string | null
          participacao_lcdpr: number | null
          produtor_id: string | null
          raccolto_acesso: boolean | null
          tipo_exploracao: number | null
        }
        Insert: {
          area_total_ha?: number
          arrendada?: boolean | null
          arrendamento_area_ha?: number | null
          arrendamento_inicio?: string | null
          arrendamento_proprietario?: string | null
          arrendamento_renovacao_auto?: boolean | null
          arrendamento_valor_brl_ha?: number | null
          arrendamento_valor_sc_ha?: number | null
          arrendamento_vencimento?: string | null
          bairro?: string | null
          caepf?: string | null
          car?: string | null
          car_vencimento?: string | null
          ccir?: string | null
          ccir_vencimento?: string | null
          cep?: string | null
          cnpj?: string | null
          complemento?: string | null
          conta_id?: string | null
          cpf_cnpj_fiscal?: string | null
          created_at?: string | null
          empresa_id?: string | null
          entidade_contabil?: string | null
          estado?: string
          id?: string
          itr?: string | null
          itr_vencimento?: string | null
          logradouro?: string | null
          municipio: string
          municipio_ibge?: string | null
          nirf?: string | null
          nome: string
          numero_end?: string | null
          owner_user_id?: string | null
          participacao_lcdpr?: number | null
          produtor_id?: string | null
          raccolto_acesso?: boolean | null
          tipo_exploracao?: number | null
        }
        Update: {
          area_total_ha?: number
          arrendada?: boolean | null
          arrendamento_area_ha?: number | null
          arrendamento_inicio?: string | null
          arrendamento_proprietario?: string | null
          arrendamento_renovacao_auto?: boolean | null
          arrendamento_valor_brl_ha?: number | null
          arrendamento_valor_sc_ha?: number | null
          arrendamento_vencimento?: string | null
          bairro?: string | null
          caepf?: string | null
          car?: string | null
          car_vencimento?: string | null
          ccir?: string | null
          ccir_vencimento?: string | null
          cep?: string | null
          cnpj?: string | null
          complemento?: string | null
          conta_id?: string | null
          cpf_cnpj_fiscal?: string | null
          created_at?: string | null
          empresa_id?: string | null
          entidade_contabil?: string | null
          estado?: string
          id?: string
          itr?: string | null
          itr_vencimento?: string | null
          logradouro?: string | null
          municipio?: string
          municipio_ibge?: string | null
          nirf?: string | null
          nome?: string
          numero_end?: string | null
          owner_user_id?: string | null
          participacao_lcdpr?: number | null
          produtor_id?: string | null
          raccolto_acesso?: boolean | null
          tipo_exploracao?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fazendas_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "contas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fazendas_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fazendas_produtor_id_fkey"
            columns: ["produtor_id"]
            isOneToOne: false
            referencedRelation: "produtores"
            referencedColumns: ["id"]
          },
        ]
      }
      fixacoes_hedge: {
        Row: {
          ciclo_id: string | null
          componente: string
          contrato_id: string | null
          created_at: string | null
          data_fixacao: string
          fazenda_id: string | null
          id: string
          instrumento_hedge: string | null
          observacao: string | null
          quantidade_sc: number
          unidade: string
          valor: number
          vencimento_ref: string | null
        }
        Insert: {
          ciclo_id?: string | null
          componente: string
          contrato_id?: string | null
          created_at?: string | null
          data_fixacao: string
          fazenda_id?: string | null
          id?: string
          instrumento_hedge?: string | null
          observacao?: string | null
          quantidade_sc: number
          unidade: string
          valor: number
          vencimento_ref?: string | null
        }
        Update: {
          ciclo_id?: string | null
          componente?: string
          contrato_id?: string | null
          created_at?: string | null
          data_fixacao?: string
          fazenda_id?: string | null
          id?: string
          instrumento_hedge?: string | null
          observacao?: string | null
          quantidade_sc?: number
          unidade?: string
          valor?: number
          vencimento_ref?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fixacoes_hedge_ciclo_id_fkey"
            columns: ["ciclo_id"]
            isOneToOne: false
            referencedRelation: "ciclos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fixacoes_hedge_contrato_id_fkey"
            columns: ["contrato_id"]
            isOneToOne: false
            referencedRelation: "contratos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fixacoes_hedge_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      folha_funcionarios: {
        Row: {
          adiantamento: number | null
          cargo: string | null
          complemento_salarial: number | null
          cp_lancamento_id: string | null
          created_at: string | null
          desc_outros_beneficios: string | null
          desc_outros_descontos: string | null
          emp_lancamento_id: string | null
          empresa_id: string | null
          fgts: number | null
          folha_id: string
          funcionario_id: string | null
          gratificacao: number | null
          id: string
          inss_patronal: number | null
          inss_trabalhador: number | null
          irrf: number | null
          nome_funcionario: string
          outros_beneficios: number | null
          outros_descontos: number | null
          produtor_id: string | null
          salario_bruto: number
          salario_liquido: number | null
          vale_refeicao: number | null
          vale_transporte: number | null
        }
        Insert: {
          adiantamento?: number | null
          cargo?: string | null
          complemento_salarial?: number | null
          cp_lancamento_id?: string | null
          created_at?: string | null
          desc_outros_beneficios?: string | null
          desc_outros_descontos?: string | null
          emp_lancamento_id?: string | null
          empresa_id?: string | null
          fgts?: number | null
          folha_id: string
          funcionario_id?: string | null
          gratificacao?: number | null
          id?: string
          inss_patronal?: number | null
          inss_trabalhador?: number | null
          irrf?: number | null
          nome_funcionario: string
          outros_beneficios?: number | null
          outros_descontos?: number | null
          produtor_id?: string | null
          salario_bruto?: number
          salario_liquido?: number | null
          vale_refeicao?: number | null
          vale_transporte?: number | null
        }
        Update: {
          adiantamento?: number | null
          cargo?: string | null
          complemento_salarial?: number | null
          cp_lancamento_id?: string | null
          created_at?: string | null
          desc_outros_beneficios?: string | null
          desc_outros_descontos?: string | null
          emp_lancamento_id?: string | null
          empresa_id?: string | null
          fgts?: number | null
          folha_id?: string
          funcionario_id?: string | null
          gratificacao?: number | null
          id?: string
          inss_patronal?: number | null
          inss_trabalhador?: number | null
          irrf?: number | null
          nome_funcionario?: string
          outros_beneficios?: number | null
          outros_descontos?: number | null
          produtor_id?: string | null
          salario_bruto?: number
          salario_liquido?: number | null
          vale_refeicao?: number | null
          vale_transporte?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "folha_funcionarios_emp_lancamento_id_fkey"
            columns: ["emp_lancamento_id"]
            isOneToOne: false
            referencedRelation: "empresa_lancamentos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "folha_funcionarios_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "folha_funcionarios_folha_id_fkey"
            columns: ["folha_id"]
            isOneToOne: false
            referencedRelation: "folha_pagamento"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "folha_funcionarios_funcionario_id_fkey"
            columns: ["funcionario_id"]
            isOneToOne: false
            referencedRelation: "funcionarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "folha_funcionarios_produtor_id_fkey"
            columns: ["produtor_id"]
            isOneToOne: false
            referencedRelation: "produtores"
            referencedColumns: ["id"]
          },
        ]
      }
      folha_pagamento: {
        Row: {
          competencia: string
          created_at: string | null
          empresa_id: string | null
          fazenda_id: string
          fgts_total: number | null
          id: string
          inss_patronal: number | null
          obs: string | null
          status: string
          valor_bruto: number | null
          valor_liquido: number | null
        }
        Insert: {
          competencia: string
          created_at?: string | null
          empresa_id?: string | null
          fazenda_id: string
          fgts_total?: number | null
          id?: string
          inss_patronal?: number | null
          obs?: string | null
          status?: string
          valor_bruto?: number | null
          valor_liquido?: number | null
        }
        Update: {
          competencia?: string
          created_at?: string | null
          empresa_id?: string | null
          fazenda_id?: string
          fgts_total?: number | null
          id?: string
          inss_patronal?: number | null
          obs?: string | null
          status?: string
          valor_bruto?: number | null
          valor_liquido?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "folha_pagamento_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "folha_pagamento_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      formas_pagamento: {
        Row: {
          ativo: boolean | null
          created_at: string | null
          descricao: string | null
          dias: string | null
          fazenda_id: string
          id: string
          nome: string
          parcelas: number | null
        }
        Insert: {
          ativo?: boolean | null
          created_at?: string | null
          descricao?: string | null
          dias?: string | null
          fazenda_id: string
          id?: string
          nome: string
          parcelas?: number | null
        }
        Update: {
          ativo?: boolean | null
          created_at?: string | null
          descricao?: string | null
          dias?: string | null
          fazenda_id?: string
          id?: string
          nome?: string
          parcelas?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "formas_pagamento_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      funcionario_ferias: {
        Row: {
          abono_pecuniario: boolean | null
          created_at: string | null
          data_fim_gozo: string | null
          data_inicio_gozo: string | null
          dias_abono: number | null
          dias_gozados: number | null
          fazenda_id: string
          funcionario_id: string
          id: string
          lancado_financeiro: boolean | null
          obs: string | null
          periodo_fim: string
          periodo_inicio: string
          status: string
          valor_abono: number | null
          valor_ferias: number | null
        }
        Insert: {
          abono_pecuniario?: boolean | null
          created_at?: string | null
          data_fim_gozo?: string | null
          data_inicio_gozo?: string | null
          dias_abono?: number | null
          dias_gozados?: number | null
          fazenda_id: string
          funcionario_id: string
          id?: string
          lancado_financeiro?: boolean | null
          obs?: string | null
          periodo_fim: string
          periodo_inicio: string
          status?: string
          valor_abono?: number | null
          valor_ferias?: number | null
        }
        Update: {
          abono_pecuniario?: boolean | null
          created_at?: string | null
          data_fim_gozo?: string | null
          data_inicio_gozo?: string | null
          dias_abono?: number | null
          dias_gozados?: number | null
          fazenda_id?: string
          funcionario_id?: string
          id?: string
          lancado_financeiro?: boolean | null
          obs?: string | null
          periodo_fim?: string
          periodo_inicio?: string
          status?: string
          valor_abono?: number | null
          valor_ferias?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "funcionario_ferias_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "funcionario_ferias_funcionario_id_fkey"
            columns: ["funcionario_id"]
            isOneToOne: false
            referencedRelation: "funcionarios"
            referencedColumns: ["id"]
          },
        ]
      }
      funcionario_premiacoes: {
        Row: {
          created_at: string | null
          data_pagamento: string | null
          descricao: string
          fazenda_id: string
          funcionario_id: string
          id: string
          lancado_financeiro: boolean | null
          lancamento_id: string | null
          mes_referencia: string | null
          valor: number
        }
        Insert: {
          created_at?: string | null
          data_pagamento?: string | null
          descricao: string
          fazenda_id: string
          funcionario_id: string
          id?: string
          lancado_financeiro?: boolean | null
          lancamento_id?: string | null
          mes_referencia?: string | null
          valor: number
        }
        Update: {
          created_at?: string | null
          data_pagamento?: string | null
          descricao?: string
          fazenda_id?: string
          funcionario_id?: string
          id?: string
          lancado_financeiro?: boolean | null
          lancamento_id?: string | null
          mes_referencia?: string | null
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "funcionario_premiacoes_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "funcionario_premiacoes_funcionario_id_fkey"
            columns: ["funcionario_id"]
            isOneToOne: false
            referencedRelation: "funcionarios"
            referencedColumns: ["id"]
          },
        ]
      }
      funcionarios: {
        Row: {
          agencia_pagamento: string | null
          area_trabalho: string | null
          ativo: boolean
          banco_pagamento: string | null
          centro_custo_id: string | null
          complemento_salarial: number | null
          conta_pagamento: string | null
          cpf: string | null
          created_at: string | null
          ctps_numero: string | null
          ctps_serie: string | null
          ctps_uf: string | null
          data_admissao: string | null
          data_demissao: string | null
          data_nascimento: string | null
          empresa_id: string | null
          fazenda_id: string
          fgts_pct: number | null
          funcao: string | null
          id: string
          inss_empregador_pct: number | null
          nome: string
          outros_beneficios: number | null
          pis_nis: string | null
          piso_categoria: number | null
          produtor_id: string | null
          provisao_13_pct: number | null
          provisao_ferias_pct: number | null
          rg: string | null
          salario_base: number | null
          sat_rat_pct: number | null
          sistema_s_pct: number | null
          tipo: string
          tipo_vinculo_esocial: string | null
          usar_funrural: boolean | null
          vale_refeicao: number | null
          vale_transporte: number | null
        }
        Insert: {
          agencia_pagamento?: string | null
          area_trabalho?: string | null
          ativo?: boolean
          banco_pagamento?: string | null
          centro_custo_id?: string | null
          complemento_salarial?: number | null
          conta_pagamento?: string | null
          cpf?: string | null
          created_at?: string | null
          ctps_numero?: string | null
          ctps_serie?: string | null
          ctps_uf?: string | null
          data_admissao?: string | null
          data_demissao?: string | null
          data_nascimento?: string | null
          empresa_id?: string | null
          fazenda_id: string
          fgts_pct?: number | null
          funcao?: string | null
          id?: string
          inss_empregador_pct?: number | null
          nome: string
          outros_beneficios?: number | null
          pis_nis?: string | null
          piso_categoria?: number | null
          produtor_id?: string | null
          provisao_13_pct?: number | null
          provisao_ferias_pct?: number | null
          rg?: string | null
          salario_base?: number | null
          sat_rat_pct?: number | null
          sistema_s_pct?: number | null
          tipo: string
          tipo_vinculo_esocial?: string | null
          usar_funrural?: boolean | null
          vale_refeicao?: number | null
          vale_transporte?: number | null
        }
        Update: {
          agencia_pagamento?: string | null
          area_trabalho?: string | null
          ativo?: boolean
          banco_pagamento?: string | null
          centro_custo_id?: string | null
          complemento_salarial?: number | null
          conta_pagamento?: string | null
          cpf?: string | null
          created_at?: string | null
          ctps_numero?: string | null
          ctps_serie?: string | null
          ctps_uf?: string | null
          data_admissao?: string | null
          data_demissao?: string | null
          data_nascimento?: string | null
          empresa_id?: string | null
          fazenda_id?: string
          fgts_pct?: number | null
          funcao?: string | null
          id?: string
          inss_empregador_pct?: number | null
          nome?: string
          outros_beneficios?: number | null
          pis_nis?: string | null
          piso_categoria?: number | null
          produtor_id?: string | null
          provisao_13_pct?: number | null
          provisao_ferias_pct?: number | null
          rg?: string | null
          salario_base?: number | null
          sat_rat_pct?: number | null
          sistema_s_pct?: number | null
          tipo?: string
          tipo_vinculo_esocial?: string | null
          usar_funrural?: boolean | null
          vale_refeicao?: number | null
          vale_transporte?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "funcionarios_centro_custo_id_fkey"
            columns: ["centro_custo_id"]
            isOneToOne: false
            referencedRelation: "centros_custo"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "funcionarios_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "funcionarios_produtor_id_fkey"
            columns: ["produtor_id"]
            isOneToOne: false
            referencedRelation: "produtores"
            referencedColumns: ["id"]
          },
        ]
      }
      funcionarios_premiacoes: {
        Row: {
          created_at: string | null
          data_pagamento: string | null
          descricao: string
          fazenda_id: string
          funcionario_id: string
          id: string
          lancado_financeiro: boolean | null
          lancamento_id: string | null
          mes_referencia: string
          valor: number
        }
        Insert: {
          created_at?: string | null
          data_pagamento?: string | null
          descricao: string
          fazenda_id: string
          funcionario_id: string
          id?: string
          lancado_financeiro?: boolean | null
          lancamento_id?: string | null
          mes_referencia: string
          valor: number
        }
        Update: {
          created_at?: string | null
          data_pagamento?: string | null
          descricao?: string
          fazenda_id?: string
          funcionario_id?: string
          id?: string
          lancado_financeiro?: boolean | null
          lancamento_id?: string | null
          mes_referencia?: string
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "funcionarios_premiacoes_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "funcionarios_premiacoes_funcionario_id_fkey"
            columns: ["funcionario_id"]
            isOneToOne: false
            referencedRelation: "funcionarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "funcionarios_premiacoes_lancamento_id_fkey"
            columns: ["lancamento_id"]
            isOneToOne: false
            referencedRelation: "lancamentos"
            referencedColumns: ["id"]
          },
        ]
      }
      garantias_contrato: {
        Row: {
          contrato_id: string | null
          created_at: string | null
          descricao: string | null
          fazenda_id: string | null
          grau: string | null
          id: string
          imovel_urbano_id: string | null
          maquina_id: string | null
          percentual_bem: number | null
          tipo: string | null
          tipo_bem: string | null
          tipo_garantia: string | null
          valor: number | null
        }
        Insert: {
          contrato_id?: string | null
          created_at?: string | null
          descricao?: string | null
          fazenda_id?: string | null
          grau?: string | null
          id?: string
          imovel_urbano_id?: string | null
          maquina_id?: string | null
          percentual_bem?: number | null
          tipo?: string | null
          tipo_bem?: string | null
          tipo_garantia?: string | null
          valor?: number | null
        }
        Update: {
          contrato_id?: string | null
          created_at?: string | null
          descricao?: string | null
          fazenda_id?: string | null
          grau?: string | null
          id?: string
          imovel_urbano_id?: string | null
          maquina_id?: string | null
          percentual_bem?: number | null
          tipo?: string | null
          tipo_bem?: string | null
          tipo_garantia?: string | null
          valor?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "garantias_contrato_contrato_id_fkey"
            columns: ["contrato_id"]
            isOneToOne: false
            referencedRelation: "contratos_financeiros"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "garantias_contrato_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "garantias_contrato_imovel_urbano_id_fkey"
            columns: ["imovel_urbano_id"]
            isOneToOne: false
            referencedRelation: "imoveis_urbanos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "garantias_contrato_maquina_id_fkey"
            columns: ["maquina_id"]
            isOneToOne: false
            referencedRelation: "maquinas"
            referencedColumns: ["id"]
          },
        ]
      }
      gnre_guias: {
        Row: {
          competencia: string | null
          created_at: string | null
          data_pagamento: string | null
          descricao_receita: string | null
          documento_origem: string | null
          fazenda_id: string
          id: string
          nosso_numero: string | null
          obs: string | null
          status: string
          tipo_receita: string
          uf_emitente: string | null
          uf_favorecida: string
          valor_juros: number
          valor_multa: number
          valor_principal: number
          valor_total: number
          vencimento: string | null
        }
        Insert: {
          competencia?: string | null
          created_at?: string | null
          data_pagamento?: string | null
          descricao_receita?: string | null
          documento_origem?: string | null
          fazenda_id: string
          id?: string
          nosso_numero?: string | null
          obs?: string | null
          status?: string
          tipo_receita: string
          uf_emitente?: string | null
          uf_favorecida: string
          valor_juros?: number
          valor_multa?: number
          valor_principal?: number
          valor_total?: number
          vencimento?: string | null
        }
        Update: {
          competencia?: string | null
          created_at?: string | null
          data_pagamento?: string | null
          descricao_receita?: string | null
          documento_origem?: string | null
          fazenda_id?: string
          id?: string
          nosso_numero?: string | null
          obs?: string | null
          status?: string
          tipo_receita?: string
          uf_emitente?: string | null
          uf_favorecida?: string
          valor_juros?: number
          valor_multa?: number
          valor_principal?: number
          valor_total?: number
          vencimento?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gnre_guias_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      grupos_insumo: {
        Row: {
          cor: string | null
          created_at: string | null
          fazenda_id: string
          id: string
          nome: string
        }
        Insert: {
          cor?: string | null
          created_at?: string | null
          fazenda_id: string
          id?: string
          nome: string
        }
        Update: {
          cor?: string | null
          created_at?: string | null
          fazenda_id?: string
          id?: string
          nome?: string
        }
        Relationships: [
          {
            foreignKeyName: "grupos_insumo_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      grupos_insumos: {
        Row: {
          cor: string | null
          created_at: string | null
          fazenda_id: string | null
          id: string
          nome: string
        }
        Insert: {
          cor?: string | null
          created_at?: string | null
          fazenda_id?: string | null
          id?: string
          nome: string
        }
        Update: {
          cor?: string | null
          created_at?: string | null
          fazenda_id?: string | null
          id?: string
          nome?: string
        }
        Relationships: [
          {
            foreignKeyName: "grupos_insumos_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      grupos_usuarios: {
        Row: {
          created_at: string | null
          descricao: string | null
          fazenda_id: string | null
          id: string
          nome: string
          permissoes: Json
        }
        Insert: {
          created_at?: string | null
          descricao?: string | null
          fazenda_id?: string | null
          id?: string
          nome: string
          permissoes?: Json
        }
        Update: {
          created_at?: string | null
          descricao?: string | null
          fazenda_id?: string | null
          id?: string
          nome?: string
          permissoes?: Json
        }
        Relationships: [
          {
            foreignKeyName: "grupos_usuarios_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      historico_conciliacao: {
        Row: {
          acao: string
          conta_nome: string | null
          created_at: string | null
          data_transacao: string | null
          descricao: string | null
          extrato_id: string
          fazenda_id: string | null
          fitid: string
          id: string
          lancamento_desc: string | null
          lancamento_ids: string[] | null
          periodo_fim: string | null
          periodo_inicio: string | null
          tipo: string | null
          valor: number | null
        }
        Insert: {
          acao: string
          conta_nome?: string | null
          created_at?: string | null
          data_transacao?: string | null
          descricao?: string | null
          extrato_id: string
          fazenda_id?: string | null
          fitid: string
          id?: string
          lancamento_desc?: string | null
          lancamento_ids?: string[] | null
          periodo_fim?: string | null
          periodo_inicio?: string | null
          tipo?: string | null
          valor?: number | null
        }
        Update: {
          acao?: string
          conta_nome?: string | null
          created_at?: string | null
          data_transacao?: string | null
          descricao?: string | null
          extrato_id?: string
          fazenda_id?: string | null
          fitid?: string
          id?: string
          lancamento_desc?: string | null
          lancamento_ids?: string[] | null
          periodo_fim?: string | null
          periodo_inicio?: string | null
          tipo?: string | null
          valor?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "historico_conciliacao_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      historico_manutencao: {
        Row: {
          created_at: string | null
          custo: number | null
          data: string
          descricao: string
          fazenda_id: string
          id: string
          maquina_id: string
          nf_entrada_item_id: string | null
          tipo: string
        }
        Insert: {
          created_at?: string | null
          custo?: number | null
          data: string
          descricao: string
          fazenda_id: string
          id?: string
          maquina_id: string
          nf_entrada_item_id?: string | null
          tipo: string
        }
        Update: {
          created_at?: string | null
          custo?: number | null
          data?: string
          descricao?: string
          fazenda_id?: string
          id?: string
          maquina_id?: string
          nf_entrada_item_id?: string | null
          tipo?: string
        }
        Relationships: [
          {
            foreignKeyName: "historico_manutencao_maquina_id_fkey"
            columns: ["maquina_id"]
            isOneToOne: false
            referencedRelation: "maquinas"
            referencedColumns: ["id"]
          },
        ]
      }
      imoveis_urbanos: {
        Row: {
          area_m2: number | null
          bairro: string | null
          cep: string | null
          complemento: string | null
          created_at: string | null
          descricao: string
          estado: string
          fazenda_id: string
          id: string
          logradouro: string | null
          matricula: string | null
          municipio: string | null
          numero_end: string | null
          observacao: string | null
          tipo: string
          valor_avaliacao: number | null
        }
        Insert: {
          area_m2?: number | null
          bairro?: string | null
          cep?: string | null
          complemento?: string | null
          created_at?: string | null
          descricao: string
          estado?: string
          fazenda_id: string
          id?: string
          logradouro?: string | null
          matricula?: string | null
          municipio?: string | null
          numero_end?: string | null
          observacao?: string | null
          tipo?: string
          valor_avaliacao?: number | null
        }
        Update: {
          area_m2?: number | null
          bairro?: string | null
          cep?: string | null
          complemento?: string | null
          created_at?: string | null
          descricao?: string
          estado?: string
          fazenda_id?: string
          id?: string
          logradouro?: string | null
          matricula?: string | null
          municipio?: string | null
          numero_end?: string | null
          observacao?: string | null
          tipo?: string
          valor_avaliacao?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "imoveis_urbanos_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      insumos: {
        Row: {
          bomba_id: string | null
          categoria: string
          created_at: string | null
          cultura_id: string | null
          custo_medio: number | null
          deposito_id: string | null
          deposito_padrao_id: string | null
          estoque: number
          estoque_minimo: number
          fabricante: string | null
          fazenda_id: string
          grupo_id: string | null
          id: string
          lote: string | null
          ncm: string | null
          nome: string
          principio_ativo_id: string | null
          subgrupo: string | null
          tipo: string
          unidade: string
          validade: string | null
          valor_unitario: number
        }
        Insert: {
          bomba_id?: string | null
          categoria: string
          created_at?: string | null
          cultura_id?: string | null
          custo_medio?: number | null
          deposito_id?: string | null
          deposito_padrao_id?: string | null
          estoque?: number
          estoque_minimo?: number
          fabricante?: string | null
          fazenda_id: string
          grupo_id?: string | null
          id?: string
          lote?: string | null
          ncm?: string | null
          nome: string
          principio_ativo_id?: string | null
          subgrupo?: string | null
          tipo?: string
          unidade: string
          validade?: string | null
          valor_unitario?: number
        }
        Update: {
          bomba_id?: string | null
          categoria?: string
          created_at?: string | null
          cultura_id?: string | null
          custo_medio?: number | null
          deposito_id?: string | null
          deposito_padrao_id?: string | null
          estoque?: number
          estoque_minimo?: number
          fabricante?: string | null
          fazenda_id?: string
          grupo_id?: string | null
          id?: string
          lote?: string | null
          ncm?: string | null
          nome?: string
          principio_ativo_id?: string | null
          subgrupo?: string | null
          tipo?: string
          unidade?: string
          validade?: string | null
          valor_unitario?: number
        }
        Relationships: [
          {
            foreignKeyName: "insumos_bomba_id_fkey"
            columns: ["bomba_id"]
            isOneToOne: false
            referencedRelation: "bombas_combustivel"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "insumos_cultura_id_fkey"
            columns: ["cultura_id"]
            isOneToOne: false
            referencedRelation: "culturas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "insumos_deposito_id_fkey"
            columns: ["deposito_id"]
            isOneToOne: false
            referencedRelation: "depositos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "insumos_deposito_padrao_id_fkey"
            columns: ["deposito_padrao_id"]
            isOneToOne: false
            referencedRelation: "depositos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "insumos_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "insumos_grupo_id_fkey"
            columns: ["grupo_id"]
            isOneToOne: false
            referencedRelation: "grupos_insumos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "insumos_principio_ativo_id_fkey"
            columns: ["principio_ativo_id"]
            isOneToOne: false
            referencedRelation: "principios_ativos"
            referencedColumns: ["id"]
          },
        ]
      }
      integracoes_catalogo: {
        Row: {
          ativo: boolean | null
          categoria: string
          config_padrao: Json | null
          config_schema: Json | null
          created_at: string | null
          descricao: string | null
          fabricante: string | null
          icone: string | null
          id: string
          nome: string
          ordem: number | null
          requer_api_key: boolean | null
          requer_hardware: boolean | null
        }
        Insert: {
          ativo?: boolean | null
          categoria: string
          config_padrao?: Json | null
          config_schema?: Json | null
          created_at?: string | null
          descricao?: string | null
          fabricante?: string | null
          icone?: string | null
          id?: string
          nome: string
          ordem?: number | null
          requer_api_key?: boolean | null
          requer_hardware?: boolean | null
        }
        Update: {
          ativo?: boolean | null
          categoria?: string
          config_padrao?: Json | null
          config_schema?: Json | null
          created_at?: string | null
          descricao?: string | null
          fabricante?: string | null
          icone?: string | null
          id?: string
          nome?: string
          ordem?: number | null
          requer_api_key?: boolean | null
          requer_hardware?: boolean | null
        }
        Relationships: []
      }
      integracoes_fazenda: {
        Row: {
          ativo: boolean | null
          config: Json | null
          created_at: string | null
          fazenda_id: string | null
          id: string
          integracao_id: string | null
          testado_em: string | null
        }
        Insert: {
          ativo?: boolean | null
          config?: Json | null
          created_at?: string | null
          fazenda_id?: string | null
          id?: string
          integracao_id?: string | null
          testado_em?: string | null
        }
        Update: {
          ativo?: boolean | null
          config?: Json | null
          created_at?: string | null
          fazenda_id?: string | null
          id?: string
          integracao_id?: string | null
          testado_em?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "integracoes_fazenda_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "integracoes_fazenda_integracao_id_fkey"
            columns: ["integracao_id"]
            isOneToOne: false
            referencedRelation: "integracoes_catalogo"
            referencedColumns: ["id"]
          },
        ]
      }
      itr_matriculas: {
        Row: {
          itr_id: string
          matricula_id: string
        }
        Insert: {
          itr_id: string
          matricula_id: string
        }
        Update: {
          itr_id?: string
          matricula_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "itr_matriculas_itr_id_fkey"
            columns: ["itr_id"]
            isOneToOne: false
            referencedRelation: "fazenda_itrs"
            referencedColumns: ["id"]
          },
        ]
      }
      lancamentos: {
        Row: {
          agrupador: string | null
          ano_safra_id: string | null
          auto: boolean | null
          cartao_id: string | null
          categoria: string
          centro_custo: string | null
          centro_custo_id: string | null
          chave_xml: string | null
          ciclo_id: string | null
          conciliado: boolean | null
          consorcio_id: string | null
          conta_bancaria: string | null
          conta_bancaria_id: string | null
          conta_pagamento: string | null
          contrato_financeiro_id: string | null
          contrato_id: string | null
          cotacao_usd: number | null
          created_at: string | null
          cultura_barter: string | null
          data_baixa: string | null
          data_emissao: string | null
          data_lancamento: string
          data_prorrogacao: string | null
          data_vencimento: string
          desconto_pontualidade_pct: number | null
          descricao: string
          empresa_id: string | null
          entidade_contabil: string | null
          fatura_cartao_id: string | null
          fatura_id: string | null
          fazenda_id: string
          forma_pagamento: string | null
          funcionario_id: string | null
          id: string
          juros_pct: number | null
          lote_id: string | null
          maquina_id: string | null
          meses_diferido: number | null
          moeda: string
          moeda_original: string | null
          moeda_pagamento: string | null
          multa_pct: number | null
          natureza: string
          nf_entrada_id: string | null
          nfe_numero: string | null
          num_parcela: number | null
          numero: number
          numero_documento: string | null
          observacao: string | null
          operacao_gerencial_id: string | null
          origem: string | null
          origem_lancamento: string | null
          pedido_compra_id: string | null
          pessoa_id: string | null
          preco_saca_barter: number | null
          produtor_id: string | null
          quantidade_mao_obra: number | null
          romaneio_id: string | null
          sacas: number | null
          safra_id: string | null
          serie: string | null
          status: string
          talhao_id: string | null
          tipo: string
          tipo_documento_lcdpr: string | null
          tipo_mao_obra: string | null
          total_parcelas: number | null
          unidade_mao_obra: string | null
          valor: number
          valor_original: number | null
          valor_pago: number | null
          veiculo_id: string | null
          vinculo_atividade: string | null
        }
        Insert: {
          agrupador?: string | null
          ano_safra_id?: string | null
          auto?: boolean | null
          cartao_id?: string | null
          categoria: string
          centro_custo?: string | null
          centro_custo_id?: string | null
          chave_xml?: string | null
          ciclo_id?: string | null
          conciliado?: boolean | null
          consorcio_id?: string | null
          conta_bancaria?: string | null
          conta_bancaria_id?: string | null
          conta_pagamento?: string | null
          contrato_financeiro_id?: string | null
          contrato_id?: string | null
          cotacao_usd?: number | null
          created_at?: string | null
          cultura_barter?: string | null
          data_baixa?: string | null
          data_emissao?: string | null
          data_lancamento: string
          data_prorrogacao?: string | null
          data_vencimento: string
          desconto_pontualidade_pct?: number | null
          descricao: string
          empresa_id?: string | null
          entidade_contabil?: string | null
          fatura_cartao_id?: string | null
          fatura_id?: string | null
          fazenda_id: string
          forma_pagamento?: string | null
          funcionario_id?: string | null
          id?: string
          juros_pct?: number | null
          lote_id?: string | null
          maquina_id?: string | null
          meses_diferido?: number | null
          moeda?: string
          moeda_original?: string | null
          moeda_pagamento?: string | null
          multa_pct?: number | null
          natureza?: string
          nf_entrada_id?: string | null
          nfe_numero?: string | null
          num_parcela?: number | null
          numero?: never
          numero_documento?: string | null
          observacao?: string | null
          operacao_gerencial_id?: string | null
          origem?: string | null
          origem_lancamento?: string | null
          pedido_compra_id?: string | null
          pessoa_id?: string | null
          preco_saca_barter?: number | null
          produtor_id?: string | null
          quantidade_mao_obra?: number | null
          romaneio_id?: string | null
          sacas?: number | null
          safra_id?: string | null
          serie?: string | null
          status?: string
          talhao_id?: string | null
          tipo: string
          tipo_documento_lcdpr?: string | null
          tipo_mao_obra?: string | null
          total_parcelas?: number | null
          unidade_mao_obra?: string | null
          valor: number
          valor_original?: number | null
          valor_pago?: number | null
          veiculo_id?: string | null
          vinculo_atividade?: string | null
        }
        Update: {
          agrupador?: string | null
          ano_safra_id?: string | null
          auto?: boolean | null
          cartao_id?: string | null
          categoria?: string
          centro_custo?: string | null
          centro_custo_id?: string | null
          chave_xml?: string | null
          ciclo_id?: string | null
          conciliado?: boolean | null
          consorcio_id?: string | null
          conta_bancaria?: string | null
          conta_bancaria_id?: string | null
          conta_pagamento?: string | null
          contrato_financeiro_id?: string | null
          contrato_id?: string | null
          cotacao_usd?: number | null
          created_at?: string | null
          cultura_barter?: string | null
          data_baixa?: string | null
          data_emissao?: string | null
          data_lancamento?: string
          data_prorrogacao?: string | null
          data_vencimento?: string
          desconto_pontualidade_pct?: number | null
          descricao?: string
          empresa_id?: string | null
          entidade_contabil?: string | null
          fatura_cartao_id?: string | null
          fatura_id?: string | null
          fazenda_id?: string
          forma_pagamento?: string | null
          funcionario_id?: string | null
          id?: string
          juros_pct?: number | null
          lote_id?: string | null
          maquina_id?: string | null
          meses_diferido?: number | null
          moeda?: string
          moeda_original?: string | null
          moeda_pagamento?: string | null
          multa_pct?: number | null
          natureza?: string
          nf_entrada_id?: string | null
          nfe_numero?: string | null
          num_parcela?: number | null
          numero?: never
          numero_documento?: string | null
          observacao?: string | null
          operacao_gerencial_id?: string | null
          origem?: string | null
          origem_lancamento?: string | null
          pedido_compra_id?: string | null
          pessoa_id?: string | null
          preco_saca_barter?: number | null
          produtor_id?: string | null
          quantidade_mao_obra?: number | null
          romaneio_id?: string | null
          sacas?: number | null
          safra_id?: string | null
          serie?: string | null
          status?: string
          talhao_id?: string | null
          tipo?: string
          tipo_documento_lcdpr?: string | null
          tipo_mao_obra?: string | null
          total_parcelas?: number | null
          unidade_mao_obra?: string | null
          valor?: number
          valor_original?: number | null
          valor_pago?: number | null
          veiculo_id?: string | null
          vinculo_atividade?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lancamentos_ano_safra_id_fkey"
            columns: ["ano_safra_id"]
            isOneToOne: false
            referencedRelation: "anos_safra"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lancamentos_cartao_id_fkey"
            columns: ["cartao_id"]
            isOneToOne: false
            referencedRelation: "cartoes_credito"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lancamentos_centro_custo_id_fkey"
            columns: ["centro_custo_id"]
            isOneToOne: false
            referencedRelation: "centros_custo"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lancamentos_ciclo_id_fkey"
            columns: ["ciclo_id"]
            isOneToOne: false
            referencedRelation: "ciclos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lancamentos_consorcio_id_fkey"
            columns: ["consorcio_id"]
            isOneToOne: false
            referencedRelation: "consorcios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lancamentos_contrato_financeiro_id_fkey"
            columns: ["contrato_financeiro_id"]
            isOneToOne: false
            referencedRelation: "contratos_financeiros"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lancamentos_contrato_id_fkey"
            columns: ["contrato_id"]
            isOneToOne: false
            referencedRelation: "contratos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lancamentos_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lancamentos_fatura_cartao_id_fkey"
            columns: ["fatura_cartao_id"]
            isOneToOne: false
            referencedRelation: "faturas_cartao"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lancamentos_fatura_id_fkey"
            columns: ["fatura_id"]
            isOneToOne: false
            referencedRelation: "faturas_fornecedor"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lancamentos_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lancamentos_funcionario_id_fkey"
            columns: ["funcionario_id"]
            isOneToOne: false
            referencedRelation: "funcionarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lancamentos_lote_id_fkey"
            columns: ["lote_id"]
            isOneToOne: false
            referencedRelation: "pagamento_lotes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lancamentos_maquina_id_fkey"
            columns: ["maquina_id"]
            isOneToOne: false
            referencedRelation: "maquinas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lancamentos_nf_entrada_id_fkey"
            columns: ["nf_entrada_id"]
            isOneToOne: false
            referencedRelation: "nf_entradas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lancamentos_operacao_gerencial_id_fkey"
            columns: ["operacao_gerencial_id"]
            isOneToOne: false
            referencedRelation: "operacoes_gerenciais"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lancamentos_pedido_compra_id_fkey"
            columns: ["pedido_compra_id"]
            isOneToOne: false
            referencedRelation: "pedidos_compra"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lancamentos_pessoa_id_fkey"
            columns: ["pessoa_id"]
            isOneToOne: false
            referencedRelation: "pessoas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lancamentos_produtor_id_fkey"
            columns: ["produtor_id"]
            isOneToOne: false
            referencedRelation: "produtores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lancamentos_romaneio_id_fkey"
            columns: ["romaneio_id"]
            isOneToOne: false
            referencedRelation: "romaneios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lancamentos_talhao_id_fkey"
            columns: ["talhao_id"]
            isOneToOne: false
            referencedRelation: "talhoes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lancamentos_veiculo_id_fkey"
            columns: ["veiculo_id"]
            isOneToOne: false
            referencedRelation: "veiculos"
            referencedColumns: ["id"]
          },
        ]
      }
      lcdpr_contador: {
        Row: {
          conta_id: string
          cpf_cnpj: string | null
          crc: string | null
          email: string | null
          nome: string | null
          telefone: string | null
          updated_at: string | null
        }
        Insert: {
          conta_id: string
          cpf_cnpj?: string | null
          crc?: string | null
          email?: string | null
          nome?: string | null
          telefone?: string | null
          updated_at?: string | null
        }
        Update: {
          conta_id?: string
          cpf_cnpj?: string | null
          crc?: string | null
          email?: string | null
          nome?: string | null
          telefone?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lcdpr_contador_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: true
            referencedRelation: "contas"
            referencedColumns: ["id"]
          },
        ]
      }
      learning_progress: {
        Row: {
          completed: boolean
          completed_at: string | null
          created_at: string | null
          fazenda_id: string
          id: string
          lesson_id: string
          user_id: string
        }
        Insert: {
          completed?: boolean
          completed_at?: string | null
          created_at?: string | null
          fazenda_id: string
          id?: string
          lesson_id: string
          user_id: string
        }
        Update: {
          completed?: boolean
          completed_at?: string | null
          created_at?: string | null
          fazenda_id?: string
          id?: string
          lesson_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "learning_progress_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      leituras_pluviometricas: {
        Row: {
          chuva_mm: number
          created_at: string | null
          data: string
          duracao_min: number | null
          fazenda_id: string
          fonte: string
          hora: string | null
          id: string
          intensidade: string | null
          observacao: string | null
          operador: string | null
          ponto_nome: string | null
          talhao_id: string | null
          usuario_id: string | null
        }
        Insert: {
          chuva_mm: number
          created_at?: string | null
          data?: string
          duracao_min?: number | null
          fazenda_id: string
          fonte?: string
          hora?: string | null
          id?: string
          intensidade?: string | null
          observacao?: string | null
          operador?: string | null
          ponto_nome?: string | null
          talhao_id?: string | null
          usuario_id?: string | null
        }
        Update: {
          chuva_mm?: number
          created_at?: string | null
          data?: string
          duracao_min?: number | null
          fazenda_id?: string
          fonte?: string
          hora?: string | null
          id?: string
          intensidade?: string | null
          observacao?: string | null
          operador?: string | null
          ponto_nome?: string | null
          talhao_id?: string | null
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leituras_pluviometricas_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leituras_pluviometricas_talhao_id_fkey"
            columns: ["talhao_id"]
            isOneToOne: false
            referencedRelation: "talhoes"
            referencedColumns: ["id"]
          },
        ]
      }
      logs_sistema: {
        Row: {
          acao: string
          created_at: string
          dados_antes: Json | null
          dados_depois: Json | null
          descricao: string
          entidade: string | null
          entidade_id: string | null
          fazenda_id: string
          id: string
          ip: string | null
          modulo: string
          usuario_email: string | null
          usuario_id: string | null
          usuario_nome: string | null
        }
        Insert: {
          acao: string
          created_at?: string
          dados_antes?: Json | null
          dados_depois?: Json | null
          descricao: string
          entidade?: string | null
          entidade_id?: string | null
          fazenda_id: string
          id?: string
          ip?: string | null
          modulo: string
          usuario_email?: string | null
          usuario_id?: string | null
          usuario_nome?: string | null
        }
        Update: {
          acao?: string
          created_at?: string
          dados_antes?: Json | null
          dados_depois?: Json | null
          descricao?: string
          entidade?: string | null
          entidade_id?: string | null
          fazenda_id?: string
          id?: string
          ip?: string | null
          modulo?: string
          usuario_email?: string | null
          usuario_id?: string | null
          usuario_nome?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "logs_sistema_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      maquinas: {
        Row: {
          ano: number | null
          ativa: boolean
          chassi: string | null
          consome_combustivel: boolean
          contrato_financiamento_id: string | null
          created_at: string | null
          data_aquisicao: string | null
          data_quitacao: string | null
          fazenda_id: string
          horimetro_atual: number | null
          id: string
          marca: string | null
          modelo: string | null
          nome: string
          nr_nf_aquisicao: string | null
          patrimonio: string | null
          placa: string | null
          proprietario_id: string | null
          seguro_corretora: string | null
          seguro_data_contratacao: string | null
          seguro_numero_apolice: string | null
          seguro_premio: number | null
          seguro_seguradora: string | null
          seguro_vencimento_apolice: string | null
          status_financiamento: string | null
          tipo: string
          valor_aquisicao: number | null
        }
        Insert: {
          ano?: number | null
          ativa?: boolean
          chassi?: string | null
          consome_combustivel?: boolean
          contrato_financiamento_id?: string | null
          created_at?: string | null
          data_aquisicao?: string | null
          data_quitacao?: string | null
          fazenda_id: string
          horimetro_atual?: number | null
          id?: string
          marca?: string | null
          modelo?: string | null
          nome: string
          nr_nf_aquisicao?: string | null
          patrimonio?: string | null
          placa?: string | null
          proprietario_id?: string | null
          seguro_corretora?: string | null
          seguro_data_contratacao?: string | null
          seguro_numero_apolice?: string | null
          seguro_premio?: number | null
          seguro_seguradora?: string | null
          seguro_vencimento_apolice?: string | null
          status_financiamento?: string | null
          tipo: string
          valor_aquisicao?: number | null
        }
        Update: {
          ano?: number | null
          ativa?: boolean
          chassi?: string | null
          consome_combustivel?: boolean
          contrato_financiamento_id?: string | null
          created_at?: string | null
          data_aquisicao?: string | null
          data_quitacao?: string | null
          fazenda_id?: string
          horimetro_atual?: number | null
          id?: string
          marca?: string | null
          modelo?: string | null
          nome?: string
          nr_nf_aquisicao?: string | null
          patrimonio?: string | null
          placa?: string | null
          proprietario_id?: string | null
          seguro_corretora?: string | null
          seguro_data_contratacao?: string | null
          seguro_numero_apolice?: string | null
          seguro_premio?: number | null
          seguro_seguradora?: string | null
          seguro_vencimento_apolice?: string | null
          status_financiamento?: string | null
          tipo?: string
          valor_aquisicao?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "maquinas_contrato_financiamento_id_fkey"
            columns: ["contrato_financiamento_id"]
            isOneToOne: false
            referencedRelation: "contratos_financeiros"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maquinas_proprietario_id_fkey"
            columns: ["proprietario_id"]
            isOneToOne: false
            referencedRelation: "pessoas"
            referencedColumns: ["id"]
          },
        ]
      }
      matriculas_imoveis: {
        Row: {
          area_ha: number | null
          cartorio: string | null
          created_at: string | null
          descricao: string | null
          em_garantia: boolean
          fazenda_id: string
          garantia_banco: string | null
          garantia_valor: number | null
          garantia_vencimento: string | null
          id: string
          municipio: string | null
          numero: string
          produtor_id: string
          uf: string | null
        }
        Insert: {
          area_ha?: number | null
          cartorio?: string | null
          created_at?: string | null
          descricao?: string | null
          em_garantia?: boolean
          fazenda_id: string
          garantia_banco?: string | null
          garantia_valor?: number | null
          garantia_vencimento?: string | null
          id?: string
          municipio?: string | null
          numero: string
          produtor_id: string
          uf?: string | null
        }
        Update: {
          area_ha?: number | null
          cartorio?: string | null
          created_at?: string | null
          descricao?: string | null
          em_garantia?: boolean
          fazenda_id?: string
          garantia_banco?: string | null
          garantia_valor?: number | null
          garantia_vencimento?: string | null
          id?: string
          municipio?: string | null
          numero?: string
          produtor_id?: string
          uf?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "matriculas_imoveis_produtor_id_fkey"
            columns: ["produtor_id"]
            isOneToOne: false
            referencedRelation: "produtores"
            referencedColumns: ["id"]
          },
        ]
      }
      mdfe: {
        Row: {
          ambiente: string | null
          carga_id: string | null
          chave: string | null
          condutor_cpf: string | null
          condutor_nome: string | null
          created_at: string | null
          data_emissao: string | null
          data_encerramento: string | null
          emit_cnpj: string | null
          emit_ie: string | null
          emit_razao_social: string | null
          emit_rntrc: string | null
          emit_uf: string | null
          fazenda_id: string
          id: string
          motivo: string | null
          mun_carregamento: string | null
          mun_descarregamento: string | null
          nfes_chave: string[] | null
          numero: string | null
          observacao: string | null
          placa_carreta: string | null
          produto: string | null
          protocolo: string | null
          quantidade_kg: number | null
          serie: string | null
          status: string | null
          uf_fim: string | null
          uf_ini: string | null
          veiculo_placa: string | null
          veiculo_rntrc: string | null
          veiculo_tipo: string | null
          veiculo_uf: string | null
          xml_gerado: string | null
        }
        Insert: {
          ambiente?: string | null
          carga_id?: string | null
          chave?: string | null
          condutor_cpf?: string | null
          condutor_nome?: string | null
          created_at?: string | null
          data_emissao?: string | null
          data_encerramento?: string | null
          emit_cnpj?: string | null
          emit_ie?: string | null
          emit_razao_social?: string | null
          emit_rntrc?: string | null
          emit_uf?: string | null
          fazenda_id: string
          id?: string
          motivo?: string | null
          mun_carregamento?: string | null
          mun_descarregamento?: string | null
          nfes_chave?: string[] | null
          numero?: string | null
          observacao?: string | null
          placa_carreta?: string | null
          produto?: string | null
          protocolo?: string | null
          quantidade_kg?: number | null
          serie?: string | null
          status?: string | null
          uf_fim?: string | null
          uf_ini?: string | null
          veiculo_placa?: string | null
          veiculo_rntrc?: string | null
          veiculo_tipo?: string | null
          veiculo_uf?: string | null
          xml_gerado?: string | null
        }
        Update: {
          ambiente?: string | null
          carga_id?: string | null
          chave?: string | null
          condutor_cpf?: string | null
          condutor_nome?: string | null
          created_at?: string | null
          data_emissao?: string | null
          data_encerramento?: string | null
          emit_cnpj?: string | null
          emit_ie?: string | null
          emit_razao_social?: string | null
          emit_rntrc?: string | null
          emit_uf?: string | null
          fazenda_id?: string
          id?: string
          motivo?: string | null
          mun_carregamento?: string | null
          mun_descarregamento?: string | null
          nfes_chave?: string[] | null
          numero?: string | null
          observacao?: string | null
          placa_carreta?: string | null
          produto?: string | null
          protocolo?: string | null
          quantidade_kg?: number | null
          serie?: string | null
          status?: string | null
          uf_fim?: string | null
          uf_ini?: string | null
          veiculo_placa?: string | null
          veiculo_rntrc?: string | null
          veiculo_tipo?: string | null
          veiculo_uf?: string | null
          xml_gerado?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mdfe_carga_id_fkey"
            columns: ["carga_id"]
            isOneToOne: false
            referencedRelation: "cargas_expedicao"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mdfe_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      mdfes: {
        Row: {
          chave_acesso: string | null
          ciot: string | null
          ciot_codigo_verificador: string | null
          ciot_protocolo: string | null
          created_at: string | null
          data_emissao: string
          data_encerramento: string | null
          documentos: Json
          fazenda_id: string
          id: string
          motorista_cpf: string | null
          motorista_id: string | null
          motorista_nome: string
          municipio_encerramento: string | null
          municipio_inicio: string
          numero_mdfe: string
          observacao: string | null
          percurso_ufs: string[] | null
          peso_total_kg: number | null
          serie: string
          status: string
          uf_encerramento: string | null
          uf_fim: string
          uf_inicio: string
          valor_total_carga: number | null
          veiculo_id: string | null
          veiculo_placa: string
          veiculo_tipo: string | null
        }
        Insert: {
          chave_acesso?: string | null
          ciot?: string | null
          ciot_codigo_verificador?: string | null
          ciot_protocolo?: string | null
          created_at?: string | null
          data_emissao: string
          data_encerramento?: string | null
          documentos?: Json
          fazenda_id: string
          id?: string
          motorista_cpf?: string | null
          motorista_id?: string | null
          motorista_nome?: string
          municipio_encerramento?: string | null
          municipio_inicio?: string
          numero_mdfe: string
          observacao?: string | null
          percurso_ufs?: string[] | null
          peso_total_kg?: number | null
          serie?: string
          status?: string
          uf_encerramento?: string | null
          uf_fim?: string
          uf_inicio?: string
          valor_total_carga?: number | null
          veiculo_id?: string | null
          veiculo_placa?: string
          veiculo_tipo?: string | null
        }
        Update: {
          chave_acesso?: string | null
          ciot?: string | null
          ciot_codigo_verificador?: string | null
          ciot_protocolo?: string | null
          created_at?: string | null
          data_emissao?: string
          data_encerramento?: string | null
          documentos?: Json
          fazenda_id?: string
          id?: string
          motorista_cpf?: string | null
          motorista_id?: string | null
          motorista_nome?: string
          municipio_encerramento?: string | null
          municipio_inicio?: string
          numero_mdfe?: string
          observacao?: string | null
          percurso_ufs?: string[] | null
          peso_total_kg?: number | null
          serie?: string
          status?: string
          uf_encerramento?: string | null
          uf_fim?: string
          uf_inicio?: string
          valor_total_carga?: number | null
          veiculo_id?: string | null
          veiculo_placa?: string
          veiculo_tipo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mdfes_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mdfes_motorista_id_fkey"
            columns: ["motorista_id"]
            isOneToOne: false
            referencedRelation: "motoristas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mdfes_veiculo_id_fkey"
            columns: ["veiculo_id"]
            isOneToOne: false
            referencedRelation: "veiculos"
            referencedColumns: ["id"]
          },
        ]
      }
      migracoes_nf: {
        Row: {
          contrato_destino_id: string
          contrato_destino_numero: string
          contrato_origem_id: string
          contrato_origem_numero: string
          created_at: string | null
          fazenda_id: string
          id: string
          motivo: string | null
          nfe_chave: string | null
          nfe_numero: string | null
          romaneio_id: string
          romaneio_numero: string
          sacas: number
          usuario: string
        }
        Insert: {
          contrato_destino_id: string
          contrato_destino_numero: string
          contrato_origem_id: string
          contrato_origem_numero: string
          created_at?: string | null
          fazenda_id: string
          id?: string
          motivo?: string | null
          nfe_chave?: string | null
          nfe_numero?: string | null
          romaneio_id: string
          romaneio_numero: string
          sacas: number
          usuario: string
        }
        Update: {
          contrato_destino_id?: string
          contrato_destino_numero?: string
          contrato_origem_id?: string
          contrato_origem_numero?: string
          created_at?: string | null
          fazenda_id?: string
          id?: string
          motivo?: string | null
          nfe_chave?: string | null
          nfe_numero?: string | null
          romaneio_id?: string
          romaneio_numero?: string
          sacas?: number
          usuario?: string
        }
        Relationships: [
          {
            foreignKeyName: "migracoes_nf_contrato_destino_id_fkey"
            columns: ["contrato_destino_id"]
            isOneToOne: false
            referencedRelation: "contratos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "migracoes_nf_contrato_origem_id_fkey"
            columns: ["contrato_origem_id"]
            isOneToOne: false
            referencedRelation: "contratos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "migracoes_nf_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "migracoes_nf_romaneio_id_fkey"
            columns: ["romaneio_id"]
            isOneToOne: false
            referencedRelation: "romaneios"
            referencedColumns: ["id"]
          },
        ]
      }
      monitoramento_pragas: {
        Row: {
          acao_recomendada: string | null
          ciclo_id: string | null
          created_at: string | null
          data: string
          data_monitoramento: string | null
          estagio: string | null
          estagio_cultura: string | null
          fazenda_id: string
          foto_url: string | null
          foto_url_2: string | null
          foto_url_3: string | null
          gps_accuracy_m: number | null
          gps_lat: number | null
          gps_lng: number | null
          id: string
          nivel: number
          nome: string
          observacoes: string | null
          percentual_plantas: number | null
          recomendacao_adubacao_id: string | null
          recomendacao_corretivo_id: string | null
          recomendacao_id: string | null
          recomendacao_plantio_id: string | null
          recomendacao_pulverizacao_id: string | null
          talhao_id: string | null
          tipo: string
          usuario_id: string | null
        }
        Insert: {
          acao_recomendada?: string | null
          ciclo_id?: string | null
          created_at?: string | null
          data?: string
          data_monitoramento?: string | null
          estagio?: string | null
          estagio_cultura?: string | null
          fazenda_id: string
          foto_url?: string | null
          foto_url_2?: string | null
          foto_url_3?: string | null
          gps_accuracy_m?: number | null
          gps_lat?: number | null
          gps_lng?: number | null
          id?: string
          nivel: number
          nome: string
          observacoes?: string | null
          percentual_plantas?: number | null
          recomendacao_adubacao_id?: string | null
          recomendacao_corretivo_id?: string | null
          recomendacao_id?: string | null
          recomendacao_plantio_id?: string | null
          recomendacao_pulverizacao_id?: string | null
          talhao_id?: string | null
          tipo: string
          usuario_id?: string | null
        }
        Update: {
          acao_recomendada?: string | null
          ciclo_id?: string | null
          created_at?: string | null
          data?: string
          data_monitoramento?: string | null
          estagio?: string | null
          estagio_cultura?: string | null
          fazenda_id?: string
          foto_url?: string | null
          foto_url_2?: string | null
          foto_url_3?: string | null
          gps_accuracy_m?: number | null
          gps_lat?: number | null
          gps_lng?: number | null
          id?: string
          nivel?: number
          nome?: string
          observacoes?: string | null
          percentual_plantas?: number | null
          recomendacao_adubacao_id?: string | null
          recomendacao_corretivo_id?: string | null
          recomendacao_id?: string | null
          recomendacao_plantio_id?: string | null
          recomendacao_pulverizacao_id?: string | null
          talhao_id?: string | null
          tipo?: string
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "monitoramento_pragas_ciclo_id_fkey"
            columns: ["ciclo_id"]
            isOneToOne: false
            referencedRelation: "ciclos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "monitoramento_pragas_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "monitoramento_pragas_recomendacao_adubacao_id_fkey"
            columns: ["recomendacao_adubacao_id"]
            isOneToOne: false
            referencedRelation: "recomendacoes_adubacao"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "monitoramento_pragas_recomendacao_corretivo_id_fkey"
            columns: ["recomendacao_corretivo_id"]
            isOneToOne: false
            referencedRelation: "recomendacoes_corretivo"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "monitoramento_pragas_recomendacao_id_fkey"
            columns: ["recomendacao_id"]
            isOneToOne: false
            referencedRelation: "recomendacoes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "monitoramento_pragas_recomendacao_plantio_id_fkey"
            columns: ["recomendacao_plantio_id"]
            isOneToOne: false
            referencedRelation: "recomendacoes_plantio"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "monitoramento_pragas_recomendacao_pulverizacao_id_fkey"
            columns: ["recomendacao_pulverizacao_id"]
            isOneToOne: false
            referencedRelation: "recomendacoes_pulverizacao"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "monitoramento_pragas_talhao_id_fkey"
            columns: ["talhao_id"]
            isOneToOne: false
            referencedRelation: "talhoes"
            referencedColumns: ["id"]
          },
        ]
      }
      motoristas: {
        Row: {
          ativo: boolean | null
          cnh: string | null
          cnh_categoria: string | null
          cnh_uf: string | null
          cnh_validade: string | null
          cpf: string | null
          created_at: string | null
          email: string | null
          fazenda_id: string
          fone: string | null
          id: string
          nome: string
          obs: string | null
          rntrc: string | null
          telefone: string | null
          tipo: string
          transportadora_id: string | null
        }
        Insert: {
          ativo?: boolean | null
          cnh?: string | null
          cnh_categoria?: string | null
          cnh_uf?: string | null
          cnh_validade?: string | null
          cpf?: string | null
          created_at?: string | null
          email?: string | null
          fazenda_id: string
          fone?: string | null
          id?: string
          nome: string
          obs?: string | null
          rntrc?: string | null
          telefone?: string | null
          tipo?: string
          transportadora_id?: string | null
        }
        Update: {
          ativo?: boolean | null
          cnh?: string | null
          cnh_categoria?: string | null
          cnh_uf?: string | null
          cnh_validade?: string | null
          cpf?: string | null
          created_at?: string | null
          email?: string | null
          fazenda_id?: string
          fone?: string | null
          id?: string
          nome?: string
          obs?: string | null
          rntrc?: string | null
          telefone?: string | null
          tipo?: string
          transportadora_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "motoristas_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "motoristas_transportadora_id_fkey"
            columns: ["transportadora_id"]
            isOneToOne: false
            referencedRelation: "transportadoras"
            referencedColumns: ["id"]
          },
        ]
      }
      movimentacoes_estoque: {
        Row: {
          auto: boolean | null
          ciclo_id: string | null
          created_at: string | null
          custo_unitario_na_baixa: number | null
          data: string
          deposito_id: string | null
          fazenda_id: string
          id: string
          insumo_id: string
          lote_semente: string | null
          motivo: string | null
          nf_entrada: string | null
          nf_entrada_id: string | null
          nf_entrada_item_id: string | null
          observacao: string | null
          operacao: string | null
          origem: string | null
          quantidade: number
          safra: string | null
          talhao: string | null
          tipo: string
          usuario_nome: string | null
          valor_unitario: number | null
          variedade: string | null
        }
        Insert: {
          auto?: boolean | null
          ciclo_id?: string | null
          created_at?: string | null
          custo_unitario_na_baixa?: number | null
          data: string
          deposito_id?: string | null
          fazenda_id: string
          id?: string
          insumo_id: string
          lote_semente?: string | null
          motivo?: string | null
          nf_entrada?: string | null
          nf_entrada_id?: string | null
          nf_entrada_item_id?: string | null
          observacao?: string | null
          operacao?: string | null
          origem?: string | null
          quantidade: number
          safra?: string | null
          talhao?: string | null
          tipo: string
          usuario_nome?: string | null
          valor_unitario?: number | null
          variedade?: string | null
        }
        Update: {
          auto?: boolean | null
          ciclo_id?: string | null
          created_at?: string | null
          custo_unitario_na_baixa?: number | null
          data?: string
          deposito_id?: string | null
          fazenda_id?: string
          id?: string
          insumo_id?: string
          lote_semente?: string | null
          motivo?: string | null
          nf_entrada?: string | null
          nf_entrada_id?: string | null
          nf_entrada_item_id?: string | null
          observacao?: string | null
          operacao?: string | null
          origem?: string | null
          quantidade?: number
          safra?: string | null
          talhao?: string | null
          tipo?: string
          usuario_nome?: string | null
          valor_unitario?: number | null
          variedade?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "movimentacoes_estoque_ciclo_id_fkey"
            columns: ["ciclo_id"]
            isOneToOne: false
            referencedRelation: "ciclos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movimentacoes_estoque_deposito_id_fkey"
            columns: ["deposito_id"]
            isOneToOne: false
            referencedRelation: "depositos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movimentacoes_estoque_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movimentacoes_estoque_insumo_id_fkey"
            columns: ["insumo_id"]
            isOneToOne: false
            referencedRelation: "insumos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movimentacoes_estoque_nf_entrada_id_fkey"
            columns: ["nf_entrada_id"]
            isOneToOne: false
            referencedRelation: "nf_entradas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movimentacoes_estoque_nf_entrada_item_id_fkey"
            columns: ["nf_entrada_item_id"]
            isOneToOne: false
            referencedRelation: "nf_entrada_itens"
            referencedColumns: ["id"]
          },
        ]
      }
      movimentacoes_pa: {
        Row: {
          created_at: string | null
          custo_unitario: number | null
          data: string
          fazenda_id: string
          id: string
          nf_entrada_id: string | null
          nf_entrada_item_id: string | null
          nome_comercial_ref: string | null
          obs: string | null
          origem_tipo: string | null
          principio_ativo_id: string
          quantidade: number
          tipo: string
        }
        Insert: {
          created_at?: string | null
          custo_unitario?: number | null
          data?: string
          fazenda_id: string
          id?: string
          nf_entrada_id?: string | null
          nf_entrada_item_id?: string | null
          nome_comercial_ref?: string | null
          obs?: string | null
          origem_tipo?: string | null
          principio_ativo_id: string
          quantidade: number
          tipo: string
        }
        Update: {
          created_at?: string | null
          custo_unitario?: number | null
          data?: string
          fazenda_id?: string
          id?: string
          nf_entrada_id?: string | null
          nf_entrada_item_id?: string | null
          nome_comercial_ref?: string | null
          obs?: string | null
          origem_tipo?: string | null
          principio_ativo_id?: string
          quantidade?: number
          tipo?: string
        }
        Relationships: [
          {
            foreignKeyName: "movimentacoes_pa_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movimentacoes_pa_nf_entrada_id_fkey"
            columns: ["nf_entrada_id"]
            isOneToOne: false
            referencedRelation: "nf_entradas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movimentacoes_pa_nf_entrada_item_id_fkey"
            columns: ["nf_entrada_item_id"]
            isOneToOne: false
            referencedRelation: "nf_entrada_itens"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movimentacoes_pa_principio_ativo_id_fkey"
            columns: ["principio_ativo_id"]
            isOneToOne: false
            referencedRelation: "principios_ativos"
            referencedColumns: ["id"]
          },
        ]
      }
      mutuos: {
        Row: {
          conta_minha: string | null
          contraparte: string
          created_at: string | null
          data_inicio: string
          data_vencimento: string
          fazenda_id: string
          id: string
          observacao: string | null
          saldo_devedor: number
          status: string
          taxa_juros_mensal: number
          tipo: string
          valor_principal: number
        }
        Insert: {
          conta_minha?: string | null
          contraparte: string
          created_at?: string | null
          data_inicio: string
          data_vencimento: string
          fazenda_id: string
          id?: string
          observacao?: string | null
          saldo_devedor?: number
          status?: string
          taxa_juros_mensal?: number
          tipo: string
          valor_principal?: number
        }
        Update: {
          conta_minha?: string | null
          contraparte?: string
          created_at?: string | null
          data_inicio?: string
          data_vencimento?: string
          fazenda_id?: string
          id?: string
          observacao?: string | null
          saldo_devedor?: number
          status?: string
          taxa_juros_mensal?: number
          tipo?: string
          valor_principal?: number
        }
        Relationships: [
          {
            foreignKeyName: "mutuos_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      ncm_tributacoes: {
        Row: {
          cbs_aliq: number
          cfop_dentro: string | null
          cfop_fora: string | null
          cofins_aliq: number
          cofins_cst: string
          created_at: string | null
          descricao: string
          fazenda_id: string
          ibs_cbs_reducao_pct: number
          ibs_estadual_aliq: number
          ibs_municipal_aliq: number
          icms_aliq: number
          icms_base_reduzida_pct: number
          icms_cst_externo: string
          icms_cst_interno: string
          id: string
          inf_cpl: string | null
          ncm: string
          pis_aliq: number
          pis_cst: string
          updated_at: string | null
        }
        Insert: {
          cbs_aliq?: number
          cfop_dentro?: string | null
          cfop_fora?: string | null
          cofins_aliq?: number
          cofins_cst?: string
          created_at?: string | null
          descricao: string
          fazenda_id: string
          ibs_cbs_reducao_pct?: number
          ibs_estadual_aliq?: number
          ibs_municipal_aliq?: number
          icms_aliq?: number
          icms_base_reduzida_pct?: number
          icms_cst_externo?: string
          icms_cst_interno?: string
          id?: string
          inf_cpl?: string | null
          ncm: string
          pis_aliq?: number
          pis_cst?: string
          updated_at?: string | null
        }
        Update: {
          cbs_aliq?: number
          cfop_dentro?: string | null
          cfop_fora?: string | null
          cofins_aliq?: number
          cofins_cst?: string
          created_at?: string | null
          descricao?: string
          fazenda_id?: string
          ibs_cbs_reducao_pct?: number
          ibs_estadual_aliq?: number
          ibs_municipal_aliq?: number
          icms_aliq?: number
          icms_base_reduzida_pct?: number
          icms_cst_externo?: string
          icms_cst_interno?: string
          id?: string
          inf_cpl?: string | null
          ncm?: string
          pis_aliq?: number
          pis_cst?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ncm_tributacoes_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      nf_entrada_itens: {
        Row: {
          alerta_preco: boolean
          bomba_id: string | null
          centro_custo_id: string | null
          cfop: string | null
          created_at: string | null
          deposito_id: string | null
          descricao_nf: string | null
          descricao_produto: string
          fator_conversao: number | null
          fazenda_id: string
          id: string
          insumo_id: string | null
          lote_semente: string | null
          lotes_semente: Json | null
          maquina_id: string | null
          ncm: string | null
          nf_entrada_id: string
          nome_comercial_ref: string | null
          operacao_gerencial_id: string | null
          principio_ativo_id: string | null
          quantidade: number
          tipo_apropiacao: string
          unidade: string
          unidade_nf: string | null
          valor_total: number
          valor_unitario: number
          variedade: string | null
        }
        Insert: {
          alerta_preco?: boolean
          bomba_id?: string | null
          centro_custo_id?: string | null
          cfop?: string | null
          created_at?: string | null
          deposito_id?: string | null
          descricao_nf?: string | null
          descricao_produto: string
          fator_conversao?: number | null
          fazenda_id: string
          id?: string
          insumo_id?: string | null
          lote_semente?: string | null
          lotes_semente?: Json | null
          maquina_id?: string | null
          ncm?: string | null
          nf_entrada_id: string
          nome_comercial_ref?: string | null
          operacao_gerencial_id?: string | null
          principio_ativo_id?: string | null
          quantidade: number
          tipo_apropiacao?: string
          unidade: string
          unidade_nf?: string | null
          valor_total: number
          valor_unitario: number
          variedade?: string | null
        }
        Update: {
          alerta_preco?: boolean
          bomba_id?: string | null
          centro_custo_id?: string | null
          cfop?: string | null
          created_at?: string | null
          deposito_id?: string | null
          descricao_nf?: string | null
          descricao_produto?: string
          fator_conversao?: number | null
          fazenda_id?: string
          id?: string
          insumo_id?: string | null
          lote_semente?: string | null
          lotes_semente?: Json | null
          maquina_id?: string | null
          ncm?: string | null
          nf_entrada_id?: string
          nome_comercial_ref?: string | null
          operacao_gerencial_id?: string | null
          principio_ativo_id?: string | null
          quantidade?: number
          tipo_apropiacao?: string
          unidade?: string
          unidade_nf?: string | null
          valor_total?: number
          valor_unitario?: number
          variedade?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nf_entrada_itens_bomba_id_fkey"
            columns: ["bomba_id"]
            isOneToOne: false
            referencedRelation: "bombas_combustivel"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nf_entrada_itens_centro_custo_id_fkey"
            columns: ["centro_custo_id"]
            isOneToOne: false
            referencedRelation: "centros_custo"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nf_entrada_itens_deposito_id_fkey"
            columns: ["deposito_id"]
            isOneToOne: false
            referencedRelation: "depositos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nf_entrada_itens_insumo_id_fkey"
            columns: ["insumo_id"]
            isOneToOne: false
            referencedRelation: "insumos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nf_entrada_itens_maquina_id_fkey"
            columns: ["maquina_id"]
            isOneToOne: false
            referencedRelation: "maquinas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nf_entrada_itens_nf_entrada_id_fkey"
            columns: ["nf_entrada_id"]
            isOneToOne: false
            referencedRelation: "nf_entradas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nf_entrada_itens_operacao_gerencial_id_fkey"
            columns: ["operacao_gerencial_id"]
            isOneToOne: false
            referencedRelation: "operacoes_gerenciais"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nf_entrada_itens_principio_ativo_id_fkey"
            columns: ["principio_ativo_id"]
            isOneToOne: false
            referencedRelation: "principios_ativos"
            referencedColumns: ["id"]
          },
        ]
      }
      nf_entradas: {
        Row: {
          ano_safra_id: string | null
          centro_custo_id: string | null
          cfop: string | null
          chave_acesso: string | null
          ciclo_id: string | null
          cnpj_destino: string | null
          created_at: string | null
          data_emissao: string
          data_entrada: string | null
          data_vencimento_cp: string | null
          deposito_destino_id: string | null
          emitente_cnpj: string | null
          emitente_nome: string
          emp_lancamento_id: string | null
          entidade_contabil: string | null
          fazenda_id: string
          forma_pagamento: string | null
          id: string
          ie_produtor: string | null
          lancamento_id: string | null
          manifestacao_data: string | null
          manifestacao_msg: string | null
          manifestacao_tipo: number | null
          natureza: string | null
          nf_origem_id: string | null
          nome_destinatario: string | null
          numero: string
          observacao: string | null
          operacao_gerencial_id: string | null
          origem: string | null
          pedido_compra_id: string | null
          pessoa_id: string | null
          processado_por: string | null
          produtor_id: string | null
          serie: string
          status: string
          tipo_entrada: string | null
          valor_desconto: number | null
          valor_difal: number | null
          valor_fcp_st: number | null
          valor_ipi: number | null
          valor_produtos: number | null
          valor_st: number | null
          valor_total: number
          vinculo_atividade: string | null
          xml_content: string | null
          xml_storage_path: string | null
        }
        Insert: {
          ano_safra_id?: string | null
          centro_custo_id?: string | null
          cfop?: string | null
          chave_acesso?: string | null
          ciclo_id?: string | null
          cnpj_destino?: string | null
          created_at?: string | null
          data_emissao: string
          data_entrada?: string | null
          data_vencimento_cp?: string | null
          deposito_destino_id?: string | null
          emitente_cnpj?: string | null
          emitente_nome: string
          emp_lancamento_id?: string | null
          entidade_contabil?: string | null
          fazenda_id: string
          forma_pagamento?: string | null
          id?: string
          ie_produtor?: string | null
          lancamento_id?: string | null
          manifestacao_data?: string | null
          manifestacao_msg?: string | null
          manifestacao_tipo?: number | null
          natureza?: string | null
          nf_origem_id?: string | null
          nome_destinatario?: string | null
          numero: string
          observacao?: string | null
          operacao_gerencial_id?: string | null
          origem?: string | null
          pedido_compra_id?: string | null
          pessoa_id?: string | null
          processado_por?: string | null
          produtor_id?: string | null
          serie?: string
          status?: string
          tipo_entrada?: string | null
          valor_desconto?: number | null
          valor_difal?: number | null
          valor_fcp_st?: number | null
          valor_ipi?: number | null
          valor_produtos?: number | null
          valor_st?: number | null
          valor_total: number
          vinculo_atividade?: string | null
          xml_content?: string | null
          xml_storage_path?: string | null
        }
        Update: {
          ano_safra_id?: string | null
          centro_custo_id?: string | null
          cfop?: string | null
          chave_acesso?: string | null
          ciclo_id?: string | null
          cnpj_destino?: string | null
          created_at?: string | null
          data_emissao?: string
          data_entrada?: string | null
          data_vencimento_cp?: string | null
          deposito_destino_id?: string | null
          emitente_cnpj?: string | null
          emitente_nome?: string
          emp_lancamento_id?: string | null
          entidade_contabil?: string | null
          fazenda_id?: string
          forma_pagamento?: string | null
          id?: string
          ie_produtor?: string | null
          lancamento_id?: string | null
          manifestacao_data?: string | null
          manifestacao_msg?: string | null
          manifestacao_tipo?: number | null
          natureza?: string | null
          nf_origem_id?: string | null
          nome_destinatario?: string | null
          numero?: string
          observacao?: string | null
          operacao_gerencial_id?: string | null
          origem?: string | null
          pedido_compra_id?: string | null
          pessoa_id?: string | null
          processado_por?: string | null
          produtor_id?: string | null
          serie?: string
          status?: string
          tipo_entrada?: string | null
          valor_desconto?: number | null
          valor_difal?: number | null
          valor_fcp_st?: number | null
          valor_ipi?: number | null
          valor_produtos?: number | null
          valor_st?: number | null
          valor_total?: number
          vinculo_atividade?: string | null
          xml_content?: string | null
          xml_storage_path?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nf_entradas_ano_safra_id_fkey"
            columns: ["ano_safra_id"]
            isOneToOne: false
            referencedRelation: "anos_safra"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nf_entradas_centro_custo_id_fkey"
            columns: ["centro_custo_id"]
            isOneToOne: false
            referencedRelation: "centros_custo"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nf_entradas_ciclo_id_fkey"
            columns: ["ciclo_id"]
            isOneToOne: false
            referencedRelation: "ciclos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nf_entradas_deposito_destino_id_fkey"
            columns: ["deposito_destino_id"]
            isOneToOne: false
            referencedRelation: "depositos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nf_entradas_emp_lancamento_id_fkey"
            columns: ["emp_lancamento_id"]
            isOneToOne: false
            referencedRelation: "empresa_lancamentos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nf_entradas_lancamento_id_fkey"
            columns: ["lancamento_id"]
            isOneToOne: false
            referencedRelation: "lancamentos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nf_entradas_nf_origem_id_fkey"
            columns: ["nf_origem_id"]
            isOneToOne: false
            referencedRelation: "nf_entradas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nf_entradas_operacao_gerencial_id_fkey"
            columns: ["operacao_gerencial_id"]
            isOneToOne: false
            referencedRelation: "operacoes_gerenciais"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nf_entradas_pedido_compra_id_fkey"
            columns: ["pedido_compra_id"]
            isOneToOne: false
            referencedRelation: "pedidos_compra"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nf_entradas_pessoa_id_fkey"
            columns: ["pessoa_id"]
            isOneToOne: false
            referencedRelation: "pessoas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nf_entradas_produtor_id_fkey"
            columns: ["produtor_id"]
            isOneToOne: false
            referencedRelation: "produtores"
            referencedColumns: ["id"]
          },
        ]
      }
      nf_importada_itens_sieg: {
        Row: {
          categoria: string | null
          centro_custo_id: string | null
          cfop: string | null
          classificado_automaticamente: boolean | null
          codigo_produto: string | null
          descricao: string
          ia_classificado: boolean | null
          ia_confianca: string | null
          ia_motivo: string | null
          id: string
          insumo_id: string | null
          ncm: string | null
          nf_id: string
          numero_item: number | null
          og_id: string | null
          quantidade: number | null
          regra_id: string | null
          status_item: string
          unidade: string | null
          valor_total: number | null
          valor_unitario: number | null
        }
        Insert: {
          categoria?: string | null
          centro_custo_id?: string | null
          cfop?: string | null
          classificado_automaticamente?: boolean | null
          codigo_produto?: string | null
          descricao?: string
          ia_classificado?: boolean | null
          ia_confianca?: string | null
          ia_motivo?: string | null
          id?: string
          insumo_id?: string | null
          ncm?: string | null
          nf_id: string
          numero_item?: number | null
          og_id?: string | null
          quantidade?: number | null
          regra_id?: string | null
          status_item?: string
          unidade?: string | null
          valor_total?: number | null
          valor_unitario?: number | null
        }
        Update: {
          categoria?: string | null
          centro_custo_id?: string | null
          cfop?: string | null
          classificado_automaticamente?: boolean | null
          codigo_produto?: string | null
          descricao?: string
          ia_classificado?: boolean | null
          ia_confianca?: string | null
          ia_motivo?: string | null
          id?: string
          insumo_id?: string | null
          ncm?: string | null
          nf_id?: string
          numero_item?: number | null
          og_id?: string | null
          quantidade?: number | null
          regra_id?: string | null
          status_item?: string
          unidade?: string | null
          valor_total?: number | null
          valor_unitario?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "nf_importada_itens_sieg_insumo_id_fkey"
            columns: ["insumo_id"]
            isOneToOne: false
            referencedRelation: "insumos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nf_importada_itens_sieg_nf_id_fkey"
            columns: ["nf_id"]
            isOneToOne: false
            referencedRelation: "nf_importadas_sieg"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nf_importada_itens_sieg_og_id_fkey"
            columns: ["og_id"]
            isOneToOne: false
            referencedRelation: "operacoes_gerenciais"
            referencedColumns: ["id"]
          },
        ]
      }
      nf_importadas_sieg: {
        Row: {
          chave_acesso: string
          classificada_em: string | null
          classificada_por: string | null
          cnpj_emitente: string
          cp_id: string | null
          created_at: string | null
          data_emissao: string | null
          erro_msg: string | null
          fazenda_id: string
          id: string
          lancamento_id: string | null
          nome_emitente: string | null
          numero: string | null
          obs: string | null
          pessoa_id: string | null
          serie: string | null
          status: string
          valor_total: number | null
          xml_storage_path: string | null
        }
        Insert: {
          chave_acesso: string
          classificada_em?: string | null
          classificada_por?: string | null
          cnpj_emitente?: string
          cp_id?: string | null
          created_at?: string | null
          data_emissao?: string | null
          erro_msg?: string | null
          fazenda_id: string
          id?: string
          lancamento_id?: string | null
          nome_emitente?: string | null
          numero?: string | null
          obs?: string | null
          pessoa_id?: string | null
          serie?: string | null
          status?: string
          valor_total?: number | null
          xml_storage_path?: string | null
        }
        Update: {
          chave_acesso?: string
          classificada_em?: string | null
          classificada_por?: string | null
          cnpj_emitente?: string
          cp_id?: string | null
          created_at?: string | null
          data_emissao?: string | null
          erro_msg?: string | null
          fazenda_id?: string
          id?: string
          lancamento_id?: string | null
          nome_emitente?: string | null
          numero?: string | null
          obs?: string | null
          pessoa_id?: string | null
          serie?: string | null
          status?: string
          valor_total?: number | null
          xml_storage_path?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nf_importadas_sieg_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nf_importadas_sieg_lancamento_id_fkey"
            columns: ["lancamento_id"]
            isOneToOne: false
            referencedRelation: "lancamentos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nf_importadas_sieg_pessoa_id_fkey"
            columns: ["pessoa_id"]
            isOneToOne: false
            referencedRelation: "pessoas"
            referencedColumns: ["id"]
          },
        ]
      }
      nf_remessas_logisticas: {
        Row: {
          cfop_remessa: string
          cfop_retorno: string
          conta_id: string | null
          created_at: string | null
          destinatario_nome: string
          destinatario_pessoa_id: string | null
          destinatario_uf: string | null
          fazenda_id: string
          id: string
          itens_json: Json | null
          natureza_remessa: string
          nf_compra_chave: string | null
          nf_entrada_id: string | null
          nf_remessa_chave: string | null
          nf_remessa_data: string | null
          nf_remessa_numero: string | null
          nf_remessa_protocolo: string | null
          nf_retorno_chave: string | null
          nf_retorno_data: string | null
          nf_retorno_numero: string | null
          nf_retorno_protocolo: string | null
          observacao: string | null
          status: string
          valor_total: number
        }
        Insert: {
          cfop_remessa?: string
          cfop_retorno?: string
          conta_id?: string | null
          created_at?: string | null
          destinatario_nome?: string
          destinatario_pessoa_id?: string | null
          destinatario_uf?: string | null
          fazenda_id: string
          id?: string
          itens_json?: Json | null
          natureza_remessa?: string
          nf_compra_chave?: string | null
          nf_entrada_id?: string | null
          nf_remessa_chave?: string | null
          nf_remessa_data?: string | null
          nf_remessa_numero?: string | null
          nf_remessa_protocolo?: string | null
          nf_retorno_chave?: string | null
          nf_retorno_data?: string | null
          nf_retorno_numero?: string | null
          nf_retorno_protocolo?: string | null
          observacao?: string | null
          status?: string
          valor_total?: number
        }
        Update: {
          cfop_remessa?: string
          cfop_retorno?: string
          conta_id?: string | null
          created_at?: string | null
          destinatario_nome?: string
          destinatario_pessoa_id?: string | null
          destinatario_uf?: string | null
          fazenda_id?: string
          id?: string
          itens_json?: Json | null
          natureza_remessa?: string
          nf_compra_chave?: string | null
          nf_entrada_id?: string | null
          nf_remessa_chave?: string | null
          nf_remessa_data?: string | null
          nf_remessa_numero?: string | null
          nf_remessa_protocolo?: string | null
          nf_retorno_chave?: string | null
          nf_retorno_data?: string | null
          nf_retorno_numero?: string | null
          nf_retorno_protocolo?: string | null
          observacao?: string | null
          status?: string
          valor_total?: number
        }
        Relationships: [
          {
            foreignKeyName: "nf_remessas_logisticas_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "contas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nf_remessas_logisticas_destinatario_pessoa_id_fkey"
            columns: ["destinatario_pessoa_id"]
            isOneToOne: false
            referencedRelation: "pessoas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nf_remessas_logisticas_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nf_remessas_logisticas_nf_entrada_id_fkey"
            columns: ["nf_entrada_id"]
            isOneToOne: false
            referencedRelation: "nf_entradas"
            referencedColumns: ["id"]
          },
        ]
      }
      nf_servicos: {
        Row: {
          aliquota_iss: number
          ano_safra_id: string | null
          centro_custo_id: string | null
          chave_nfse: string | null
          cnae: string | null
          codigo_servico: string | null
          competencia: string | null
          created_at: string | null
          data_prestacao: string
          data_vencimento_cp: string | null
          discriminacao: string | null
          empresa_id: string | null
          fazenda_id: string
          id: string
          iss_retido: boolean
          lancamento_id: string | null
          municipio_prestacao: string | null
          numero_nf: string
          observacao: string | null
          operacao_gerencial_id: string | null
          origem: string
          pedido_compra_id: string | null
          prestador_cnpj: string | null
          prestador_id: string | null
          prestador_nome: string
          processado_por: string | null
          serie: string
          status: string
          tomador_cnpj: string | null
          tomador_id: string | null
          tomador_nome: string | null
          tomador_tipo: string | null
          valor_base_iss: number
          valor_deducoes: number
          valor_inss: number
          valor_ir: number
          valor_iss: number
          valor_liquido: number
          valor_outras_retencoes: number
          valor_servico: number
        }
        Insert: {
          aliquota_iss?: number
          ano_safra_id?: string | null
          centro_custo_id?: string | null
          chave_nfse?: string | null
          cnae?: string | null
          codigo_servico?: string | null
          competencia?: string | null
          created_at?: string | null
          data_prestacao: string
          data_vencimento_cp?: string | null
          discriminacao?: string | null
          empresa_id?: string | null
          fazenda_id: string
          id?: string
          iss_retido?: boolean
          lancamento_id?: string | null
          municipio_prestacao?: string | null
          numero_nf: string
          observacao?: string | null
          operacao_gerencial_id?: string | null
          origem?: string
          pedido_compra_id?: string | null
          prestador_cnpj?: string | null
          prestador_id?: string | null
          prestador_nome: string
          processado_por?: string | null
          serie?: string
          status?: string
          tomador_cnpj?: string | null
          tomador_id?: string | null
          tomador_nome?: string | null
          tomador_tipo?: string | null
          valor_base_iss?: number
          valor_deducoes?: number
          valor_inss?: number
          valor_ir?: number
          valor_iss?: number
          valor_liquido?: number
          valor_outras_retencoes?: number
          valor_servico?: number
        }
        Update: {
          aliquota_iss?: number
          ano_safra_id?: string | null
          centro_custo_id?: string | null
          chave_nfse?: string | null
          cnae?: string | null
          codigo_servico?: string | null
          competencia?: string | null
          created_at?: string | null
          data_prestacao?: string
          data_vencimento_cp?: string | null
          discriminacao?: string | null
          empresa_id?: string | null
          fazenda_id?: string
          id?: string
          iss_retido?: boolean
          lancamento_id?: string | null
          municipio_prestacao?: string | null
          numero_nf?: string
          observacao?: string | null
          operacao_gerencial_id?: string | null
          origem?: string
          pedido_compra_id?: string | null
          prestador_cnpj?: string | null
          prestador_id?: string | null
          prestador_nome?: string
          processado_por?: string | null
          serie?: string
          status?: string
          tomador_cnpj?: string | null
          tomador_id?: string | null
          tomador_nome?: string | null
          tomador_tipo?: string | null
          valor_base_iss?: number
          valor_deducoes?: number
          valor_inss?: number
          valor_ir?: number
          valor_iss?: number
          valor_liquido?: number
          valor_outras_retencoes?: number
          valor_servico?: number
        }
        Relationships: [
          {
            foreignKeyName: "nf_servicos_ano_safra_id_fkey"
            columns: ["ano_safra_id"]
            isOneToOne: false
            referencedRelation: "anos_safra"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nf_servicos_centro_custo_id_fkey"
            columns: ["centro_custo_id"]
            isOneToOne: false
            referencedRelation: "centros_custo"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nf_servicos_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nf_servicos_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nf_servicos_lancamento_id_fkey"
            columns: ["lancamento_id"]
            isOneToOne: false
            referencedRelation: "lancamentos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nf_servicos_operacao_gerencial_id_fkey"
            columns: ["operacao_gerencial_id"]
            isOneToOne: false
            referencedRelation: "operacoes_gerenciais"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nf_servicos_pedido_compra_id_fkey"
            columns: ["pedido_compra_id"]
            isOneToOne: false
            referencedRelation: "pedidos_compra"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nf_servicos_prestador_id_fkey"
            columns: ["prestador_id"]
            isOneToOne: false
            referencedRelation: "pessoas"
            referencedColumns: ["id"]
          },
        ]
      }
      nirf_matriculas: {
        Row: {
          matricula_id: string
          nirf_id: string
        }
        Insert: {
          matricula_id: string
          nirf_id: string
        }
        Update: {
          matricula_id?: string
          nirf_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "nirf_matriculas_nirf_id_fkey"
            columns: ["nirf_id"]
            isOneToOne: false
            referencedRelation: "fazenda_nirfs"
            referencedColumns: ["id"]
          },
        ]
      }
      nomes_comerciais: {
        Row: {
          confirmado: boolean | null
          created_at: string | null
          criado_por: string | null
          fazenda_origem_id: string | null
          id: string
          nome_comercial: string
          principio_ativo_id: string
        }
        Insert: {
          confirmado?: boolean | null
          created_at?: string | null
          criado_por?: string | null
          fazenda_origem_id?: string | null
          id?: string
          nome_comercial: string
          principio_ativo_id: string
        }
        Update: {
          confirmado?: boolean | null
          created_at?: string | null
          criado_por?: string | null
          fazenda_origem_id?: string | null
          id?: string
          nome_comercial?: string
          principio_ativo_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "nomes_comerciais_principio_ativo_id_fkey"
            columns: ["principio_ativo_id"]
            isOneToOne: false
            referencedRelation: "principios_ativos"
            referencedColumns: ["id"]
          },
        ]
      }
      notas_fiscais: {
        Row: {
          auto: boolean | null
          cfop: string
          chave_acesso: string | null
          cnpj_destinatario: string | null
          contingencia_dh: string | null
          contingencia_motivo: string | null
          created_at: string | null
          dados_nf_json: Json | null
          danfe_url: string | null
          data_emissao: string
          destinatario: string
          fazenda_id: string
          id: string
          itens_json: Json | null
          natureza: string
          numero: string
          observacao: string | null
          romaneio_id: string | null
          serie: string
          status: string
          tipo: string
          tipo_emissao: number
          valor_total: number
          xml_url: string | null
        }
        Insert: {
          auto?: boolean | null
          cfop: string
          chave_acesso?: string | null
          cnpj_destinatario?: string | null
          contingencia_dh?: string | null
          contingencia_motivo?: string | null
          created_at?: string | null
          dados_nf_json?: Json | null
          danfe_url?: string | null
          data_emissao: string
          destinatario: string
          fazenda_id: string
          id?: string
          itens_json?: Json | null
          natureza: string
          numero: string
          observacao?: string | null
          romaneio_id?: string | null
          serie?: string
          status?: string
          tipo: string
          tipo_emissao?: number
          valor_total: number
          xml_url?: string | null
        }
        Update: {
          auto?: boolean | null
          cfop?: string
          chave_acesso?: string | null
          cnpj_destinatario?: string | null
          contingencia_dh?: string | null
          contingencia_motivo?: string | null
          created_at?: string | null
          dados_nf_json?: Json | null
          danfe_url?: string | null
          data_emissao?: string
          destinatario?: string
          fazenda_id?: string
          id?: string
          itens_json?: Json | null
          natureza?: string
          numero?: string
          observacao?: string | null
          romaneio_id?: string | null
          serie?: string
          status?: string
          tipo?: string
          tipo_emissao?: number
          valor_total?: number
          xml_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notas_fiscais_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notas_fiscais_romaneio_id_fkey"
            columns: ["romaneio_id"]
            isOneToOne: false
            referencedRelation: "romaneios"
            referencedColumns: ["id"]
          },
        ]
      }
      operacao_cfop_fiscal: {
        Row: {
          ativo: boolean | null
          cfop: string
          compoe_faturamento: boolean | null
          created_at: string | null
          cst_cofins: string | null
          cst_pis: string | null
          descricao_cfop: string | null
          fazenda_id: string
          fins_exportacao: boolean | null
          id: string
          ncm: string | null
          operacao_gerencial_id: string
          operacao_nf: string | null
          tipo_pessoa: string | null
        }
        Insert: {
          ativo?: boolean | null
          cfop: string
          compoe_faturamento?: boolean | null
          created_at?: string | null
          cst_cofins?: string | null
          cst_pis?: string | null
          descricao_cfop?: string | null
          fazenda_id: string
          fins_exportacao?: boolean | null
          id?: string
          ncm?: string | null
          operacao_gerencial_id: string
          operacao_nf?: string | null
          tipo_pessoa?: string | null
        }
        Update: {
          ativo?: boolean | null
          cfop?: string
          compoe_faturamento?: boolean | null
          created_at?: string | null
          cst_cofins?: string | null
          cst_pis?: string | null
          descricao_cfop?: string | null
          fazenda_id?: string
          fins_exportacao?: boolean | null
          id?: string
          ncm?: string | null
          operacao_gerencial_id?: string
          operacao_nf?: string | null
          tipo_pessoa?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "operacao_cfop_fiscal_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "operacao_cfop_fiscal_operacao_gerencial_id_fkey"
            columns: ["operacao_gerencial_id"]
            isOneToOne: false
            referencedRelation: "operacoes_gerenciais"
            referencedColumns: ["id"]
          },
        ]
      }
      operacoes: {
        Row: {
          auto: boolean | null
          created_at: string | null
          custo_ha: number | null
          data_prev: string | null
          data_real: string | null
          id: string
          nome: string
          safra_id: string
          status: string
          talhao_id: string | null
          tipo: string
        }
        Insert: {
          auto?: boolean | null
          created_at?: string | null
          custo_ha?: number | null
          data_prev?: string | null
          data_real?: string | null
          id?: string
          nome: string
          safra_id: string
          status?: string
          talhao_id?: string | null
          tipo: string
        }
        Update: {
          auto?: boolean | null
          created_at?: string | null
          custo_ha?: number | null
          data_prev?: string | null
          data_real?: string | null
          id?: string
          nome?: string
          safra_id?: string
          status?: string
          talhao_id?: string | null
          tipo?: string
        }
        Relationships: [
          {
            foreignKeyName: "operacoes_safra_id_fkey"
            columns: ["safra_id"]
            isOneToOne: false
            referencedRelation: "safras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "operacoes_talhao_id_fkey"
            columns: ["talhao_id"]
            isOneToOne: false
            referencedRelation: "talhoes"
            referencedColumns: ["id"]
          },
        ]
      }
      operacoes_compra: {
        Row: {
          ativo: boolean | null
          created_at: string | null
          descricao: string | null
          fazenda_id: string
          id: string
          nome: string
          tipo: string
        }
        Insert: {
          ativo?: boolean | null
          created_at?: string | null
          descricao?: string | null
          fazenda_id: string
          id?: string
          nome: string
          tipo?: string
        }
        Update: {
          ativo?: boolean | null
          created_at?: string | null
          descricao?: string | null
          fazenda_id?: string
          id?: string
          nome?: string
          tipo?: string
        }
        Relationships: [
          {
            foreignKeyName: "operacoes_compra_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      operacoes_fiscais: {
        Row: {
          ativa: boolean
          cfop_externo: string
          cfop_interno: string
          cofins_aliq: number
          cofins_cst: string
          created_at: string | null
          descricao: string | null
          fazenda_id: string
          ibs_cbs_imune: boolean
          ibs_cbs_reducao_pct: number
          icms_aliq: number
          icms_base_reduzida_pct: number
          icms_cst_externo: string
          icms_cst_interno: string
          id: string
          inf_cpl_template: string | null
          nome: string
          pis_aliq: number
          pis_cst: string
          updated_at: string | null
        }
        Insert: {
          ativa?: boolean
          cfop_externo: string
          cfop_interno: string
          cofins_aliq?: number
          cofins_cst?: string
          created_at?: string | null
          descricao?: string | null
          fazenda_id: string
          ibs_cbs_imune?: boolean
          ibs_cbs_reducao_pct?: number
          icms_aliq?: number
          icms_base_reduzida_pct?: number
          icms_cst_externo?: string
          icms_cst_interno?: string
          id?: string
          inf_cpl_template?: string | null
          nome: string
          pis_aliq?: number
          pis_cst?: string
          updated_at?: string | null
        }
        Update: {
          ativa?: boolean
          cfop_externo?: string
          cfop_interno?: string
          cofins_aliq?: number
          cofins_cst?: string
          created_at?: string | null
          descricao?: string | null
          fazenda_id?: string
          ibs_cbs_imune?: boolean
          ibs_cbs_reducao_pct?: number
          icms_aliq?: number
          icms_base_reduzida_pct?: number
          icms_cst_externo?: string
          icms_cst_interno?: string
          id?: string
          inf_cpl_template?: string | null
          nome?: string
          pis_aliq?: number
          pis_cst?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "operacoes_fiscais_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      operacoes_gerenciais: {
        Row: {
          atualizar_custo_estoque: boolean | null
          classificacao: string
          codigo_lcdpr: string | null
          conta_credito: string | null
          conta_debito: string | null
          conta_id: string | null
          created_at: string | null
          custo_abc: boolean | null
          custo_absorcao: boolean | null
          descricao: string
          escopo_cc: string | null
          fazenda_id: string | null
          gerar_depreciacao: boolean | null
          gerar_financeiro: boolean | null
          gerar_financeiro_gerencial: boolean | null
          historico_tesouraria_id: number | null
          historico_tesouraria_nome: string | null
          id: string
          impostos: string[] | null
          inativo: boolean | null
          informa_complemento: boolean | null
          manutencao_reparos: boolean | null
          marcar_fiscal_padrao: boolean | null
          modelo_contabil: string | null
          natureza_receita: string | null
          obs_legal: string | null
          operacao_estoque: string | null
          parent_id: string | null
          permite_adiantamentos: boolean | null
          permite_baixas: boolean | null
          permite_contrato_financeiro: boolean | null
          permite_cp_cr: boolean | null
          permite_custo_produto: boolean | null
          permite_energia_eletrica: boolean | null
          permite_estoque: boolean | null
          permite_manutencao: boolean | null
          permite_notas_fiscais: boolean | null
          permite_pedidos_venda: boolean | null
          permite_tesouraria: boolean | null
          ref_id: number | null
          tipo: string
          tipo_custo_estoque: string | null
          tipo_formula: string | null
          tipo_item_estoque: string | null
          tipo_lcdpr: string | null
          valida_propriedade: boolean | null
        }
        Insert: {
          atualizar_custo_estoque?: boolean | null
          classificacao: string
          codigo_lcdpr?: string | null
          conta_credito?: string | null
          conta_debito?: string | null
          conta_id?: string | null
          created_at?: string | null
          custo_abc?: boolean | null
          custo_absorcao?: boolean | null
          descricao: string
          escopo_cc?: string | null
          fazenda_id?: string | null
          gerar_depreciacao?: boolean | null
          gerar_financeiro?: boolean | null
          gerar_financeiro_gerencial?: boolean | null
          historico_tesouraria_id?: number | null
          historico_tesouraria_nome?: string | null
          id?: string
          impostos?: string[] | null
          inativo?: boolean | null
          informa_complemento?: boolean | null
          manutencao_reparos?: boolean | null
          marcar_fiscal_padrao?: boolean | null
          modelo_contabil?: string | null
          natureza_receita?: string | null
          obs_legal?: string | null
          operacao_estoque?: string | null
          parent_id?: string | null
          permite_adiantamentos?: boolean | null
          permite_baixas?: boolean | null
          permite_contrato_financeiro?: boolean | null
          permite_cp_cr?: boolean | null
          permite_custo_produto?: boolean | null
          permite_energia_eletrica?: boolean | null
          permite_estoque?: boolean | null
          permite_manutencao?: boolean | null
          permite_notas_fiscais?: boolean | null
          permite_pedidos_venda?: boolean | null
          permite_tesouraria?: boolean | null
          ref_id?: number | null
          tipo?: string
          tipo_custo_estoque?: string | null
          tipo_formula?: string | null
          tipo_item_estoque?: string | null
          tipo_lcdpr?: string | null
          valida_propriedade?: boolean | null
        }
        Update: {
          atualizar_custo_estoque?: boolean | null
          classificacao?: string
          codigo_lcdpr?: string | null
          conta_credito?: string | null
          conta_debito?: string | null
          conta_id?: string | null
          created_at?: string | null
          custo_abc?: boolean | null
          custo_absorcao?: boolean | null
          descricao?: string
          escopo_cc?: string | null
          fazenda_id?: string | null
          gerar_depreciacao?: boolean | null
          gerar_financeiro?: boolean | null
          gerar_financeiro_gerencial?: boolean | null
          historico_tesouraria_id?: number | null
          historico_tesouraria_nome?: string | null
          id?: string
          impostos?: string[] | null
          inativo?: boolean | null
          informa_complemento?: boolean | null
          manutencao_reparos?: boolean | null
          marcar_fiscal_padrao?: boolean | null
          modelo_contabil?: string | null
          natureza_receita?: string | null
          obs_legal?: string | null
          operacao_estoque?: string | null
          parent_id?: string | null
          permite_adiantamentos?: boolean | null
          permite_baixas?: boolean | null
          permite_contrato_financeiro?: boolean | null
          permite_cp_cr?: boolean | null
          permite_custo_produto?: boolean | null
          permite_energia_eletrica?: boolean | null
          permite_estoque?: boolean | null
          permite_manutencao?: boolean | null
          permite_notas_fiscais?: boolean | null
          permite_pedidos_venda?: boolean | null
          permite_tesouraria?: boolean | null
          ref_id?: number | null
          tipo?: string
          tipo_custo_estoque?: string | null
          tipo_formula?: string | null
          tipo_item_estoque?: string | null
          tipo_lcdpr?: string | null
          valida_propriedade?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "operacoes_gerenciais_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "contas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "operacoes_gerenciais_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "operacoes_gerenciais_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "operacoes_gerenciais"
            referencedColumns: ["id"]
          },
        ]
      }
      operacoes_tesouraria: {
        Row: {
          ativo: boolean | null
          categoria: string | null
          created_at: string | null
          fazenda_id: string
          id: string
          nome: string
          observacao: string | null
          operacao_gerencial_id: string | null
          tipo: string
        }
        Insert: {
          ativo?: boolean | null
          categoria?: string | null
          created_at?: string | null
          fazenda_id: string
          id?: string
          nome: string
          observacao?: string | null
          operacao_gerencial_id?: string | null
          tipo: string
        }
        Update: {
          ativo?: boolean | null
          categoria?: string | null
          created_at?: string | null
          fazenda_id?: string
          id?: string
          nome?: string
          observacao?: string | null
          operacao_gerencial_id?: string | null
          tipo?: string
        }
        Relationships: [
          {
            foreignKeyName: "operacoes_tesouraria_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "operacoes_tesouraria_operacao_gerencial_id_fkey"
            columns: ["operacao_gerencial_id"]
            isOneToOne: false
            referencedRelation: "operacoes_gerenciais"
            referencedColumns: ["id"]
          },
        ]
      }
      orcamento_itens: {
        Row: {
          categoria: string
          created_at: string | null
          descricao: string
          fazenda_id: string
          id: string
          insumo_id: string | null
          orcamento_id: string
          quantidade: number | null
          subcategoria: string | null
          unidade: string | null
          valor_total: number | null
          valor_unitario: number | null
        }
        Insert: {
          categoria: string
          created_at?: string | null
          descricao: string
          fazenda_id: string
          id?: string
          insumo_id?: string | null
          orcamento_id: string
          quantidade?: number | null
          subcategoria?: string | null
          unidade?: string | null
          valor_total?: number | null
          valor_unitario?: number | null
        }
        Update: {
          categoria?: string
          created_at?: string | null
          descricao?: string
          fazenda_id?: string
          id?: string
          insumo_id?: string | null
          orcamento_id?: string
          quantidade?: number | null
          subcategoria?: string | null
          unidade?: string | null
          valor_total?: number | null
          valor_unitario?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "orcamento_itens_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orcamento_itens_insumo_id_fkey"
            columns: ["insumo_id"]
            isOneToOne: false
            referencedRelation: "insumos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orcamento_itens_orcamento_id_fkey"
            columns: ["orcamento_id"]
            isOneToOne: false
            referencedRelation: "orcamentos"
            referencedColumns: ["id"]
          },
        ]
      }
      orcamentos: {
        Row: {
          area_ha: number | null
          ciclo_id: string
          created_at: string | null
          fazenda_id: string
          id: string
          nome: string
          preco_esperado_sc: number | null
          produtividade_esperada: number | null
          status: string
        }
        Insert: {
          area_ha?: number | null
          ciclo_id: string
          created_at?: string | null
          fazenda_id: string
          id?: string
          nome: string
          preco_esperado_sc?: number | null
          produtividade_esperada?: number | null
          status?: string
        }
        Update: {
          area_ha?: number | null
          ciclo_id?: string
          created_at?: string | null
          fazenda_id?: string
          id?: string
          nome?: string
          preco_esperado_sc?: number | null
          produtividade_esperada?: number | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "orcamentos_ciclo_id_fkey"
            columns: ["ciclo_id"]
            isOneToOne: false
            referencedRelation: "ciclos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orcamentos_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      pa_saldos: {
        Row: {
          custo_medio: number
          fazenda_id: string
          id: string
          principio_ativo_id: string
          saldo_atual: number
          updated_at: string | null
        }
        Insert: {
          custo_medio?: number
          fazenda_id: string
          id?: string
          principio_ativo_id: string
          saldo_atual?: number
          updated_at?: string | null
        }
        Update: {
          custo_medio?: number
          fazenda_id?: string
          id?: string
          principio_ativo_id?: string
          saldo_atual?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pa_saldos_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pa_saldos_principio_ativo_id_fkey"
            columns: ["principio_ativo_id"]
            isOneToOne: false
            referencedRelation: "principios_ativos"
            referencedColumns: ["id"]
          },
        ]
      }
      padroes_classificacao: {
        Row: {
          ardidos_max: number | null
          ativo: boolean
          avariados_padrao: number
          carunchados_max: number | null
          commodity: string
          created_at: string | null
          esverdeados_max: number | null
          fazenda_id: string
          id: string
          impureza_padrao: number
          kg_saca: number
          mofados_max: number | null
          nome_padrao: string
          ph_minimo: number | null
          quebrados_max: number | null
          umidade_padrao: number
        }
        Insert: {
          ardidos_max?: number | null
          ativo?: boolean
          avariados_padrao: number
          carunchados_max?: number | null
          commodity: string
          created_at?: string | null
          esverdeados_max?: number | null
          fazenda_id: string
          id?: string
          impureza_padrao: number
          kg_saca?: number
          mofados_max?: number | null
          nome_padrao: string
          ph_minimo?: number | null
          quebrados_max?: number | null
          umidade_padrao: number
        }
        Update: {
          ardidos_max?: number | null
          ativo?: boolean
          avariados_padrao?: number
          carunchados_max?: number | null
          commodity?: string
          created_at?: string | null
          esverdeados_max?: number | null
          fazenda_id?: string
          id?: string
          impureza_padrao?: number
          kg_saca?: number
          mofados_max?: number | null
          nome_padrao?: string
          ph_minimo?: number | null
          quebrados_max?: number | null
          umidade_padrao?: number
        }
        Relationships: [
          {
            foreignKeyName: "padroes_classificacao_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      pagamento_lote_itens: {
        Row: {
          created_at: string | null
          id: string
          lancamento_id: string
          lote_id: string
          valor_pago: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          lancamento_id: string
          lote_id: string
          valor_pago: number
        }
        Update: {
          created_at?: string | null
          id?: string
          lancamento_id?: string
          lote_id?: string
          valor_pago?: number
        }
        Relationships: [
          {
            foreignKeyName: "pagamento_lote_itens_lancamento_id_fkey"
            columns: ["lancamento_id"]
            isOneToOne: false
            referencedRelation: "lancamentos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pagamento_lote_itens_lote_id_fkey"
            columns: ["lote_id"]
            isOneToOne: false
            referencedRelation: "pagamento_lotes"
            referencedColumns: ["id"]
          },
        ]
      }
      pagamento_lotes: {
        Row: {
          conciliado: boolean | null
          conta_bancaria: string | null
          created_at: string | null
          data_pagamento: string | null
          descricao: string | null
          fazenda_id: string
          id: string
          status: string
          tipo: string
          valor_total: number
        }
        Insert: {
          conciliado?: boolean | null
          conta_bancaria?: string | null
          created_at?: string | null
          data_pagamento?: string | null
          descricao?: string | null
          fazenda_id: string
          id?: string
          status?: string
          tipo: string
          valor_total?: number
        }
        Update: {
          conciliado?: boolean | null
          conta_bancaria?: string | null
          created_at?: string | null
          data_pagamento?: string | null
          descricao?: string | null
          fazenda_id?: string
          id?: string
          status?: string
          tipo?: string
          valor_total?: number
        }
        Relationships: [
          {
            foreignKeyName: "pagamento_lotes_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      pagamentos: {
        Row: {
          asaas_bank_slip_url: string | null
          asaas_invoice_url: string | null
          asaas_payment_id: string | null
          asaas_pix_qrcode: string | null
          assinatura_id: string | null
          comprovante_url: string | null
          conta_id: string
          created_at: string | null
          data_pagamento: string | null
          data_vencimento: string
          descricao: string | null
          id: string
          metodo_pagamento: string | null
          status: string
          valor: number
        }
        Insert: {
          asaas_bank_slip_url?: string | null
          asaas_invoice_url?: string | null
          asaas_payment_id?: string | null
          asaas_pix_qrcode?: string | null
          assinatura_id?: string | null
          comprovante_url?: string | null
          conta_id: string
          created_at?: string | null
          data_pagamento?: string | null
          data_vencimento: string
          descricao?: string | null
          id?: string
          metodo_pagamento?: string | null
          status?: string
          valor: number
        }
        Update: {
          asaas_bank_slip_url?: string | null
          asaas_invoice_url?: string | null
          asaas_payment_id?: string | null
          asaas_pix_qrcode?: string | null
          assinatura_id?: string | null
          comprovante_url?: string | null
          conta_id?: string
          created_at?: string | null
          data_pagamento?: string | null
          data_vencimento?: string
          descricao?: string | null
          id?: string
          metodo_pagamento?: string | null
          status?: string
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "pagamentos_assinatura_id_fkey"
            columns: ["assinatura_id"]
            isOneToOne: false
            referencedRelation: "assinaturas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pagamentos_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "contas"
            referencedColumns: ["id"]
          },
        ]
      }
      pagamentos_mutuo: {
        Row: {
          conta_pagamento: string | null
          created_at: string | null
          data_pagamento: string
          id: string
          mutuo_id: string
          observacao: string | null
          valor_juros: number
          valor_principal: number
          valor_total: number
        }
        Insert: {
          conta_pagamento?: string | null
          created_at?: string | null
          data_pagamento: string
          id?: string
          mutuo_id: string
          observacao?: string | null
          valor_juros?: number
          valor_principal?: number
          valor_total?: number
        }
        Update: {
          conta_pagamento?: string | null
          created_at?: string | null
          data_pagamento?: string
          id?: string
          mutuo_id?: string
          observacao?: string | null
          valor_juros?: number
          valor_principal?: number
          valor_total?: number
        }
        Relationships: [
          {
            foreignKeyName: "pagamentos_mutuo_mutuo_id_fkey"
            columns: ["mutuo_id"]
            isOneToOne: false
            referencedRelation: "mutuos"
            referencedColumns: ["id"]
          },
        ]
      }
      pagamentos_premio_seguro: {
        Row: {
          apolice_id: string
          created_at: string | null
          data_pagamento: string | null
          data_vencimento: string
          fazenda_id: string | null
          id: string
          lancamento_id: string | null
          observacao: string | null
          pago: boolean
          valor: number
        }
        Insert: {
          apolice_id: string
          created_at?: string | null
          data_pagamento?: string | null
          data_vencimento: string
          fazenda_id?: string | null
          id?: string
          lancamento_id?: string | null
          observacao?: string | null
          pago?: boolean
          valor?: number
        }
        Update: {
          apolice_id?: string
          created_at?: string | null
          data_pagamento?: string | null
          data_vencimento?: string
          fazenda_id?: string | null
          id?: string
          lancamento_id?: string | null
          observacao?: string | null
          pago?: boolean
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "pagamentos_premio_seguro_apolice_id_fkey"
            columns: ["apolice_id"]
            isOneToOne: false
            referencedRelation: "apolices_seguro"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pagamentos_premio_seguro_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pagamentos_premio_seguro_lancamento_id_fkey"
            columns: ["lancamento_id"]
            isOneToOne: false
            referencedRelation: "lancamentos"
            referencedColumns: ["id"]
          },
        ]
      }
      parametros_armazenagem: {
        Row: {
          created_at: string | null
          fazenda_id: string
          id: string
          observacao: string | null
          produto: string | null
          quebra_pct: number
          tipo_deposito: string
        }
        Insert: {
          created_at?: string | null
          fazenda_id: string
          id?: string
          observacao?: string | null
          produto?: string | null
          quebra_pct?: number
          tipo_deposito?: string
        }
        Update: {
          created_at?: string | null
          fazenda_id?: string
          id?: string
          observacao?: string | null
          produto?: string | null
          quebra_pct?: number
          tipo_deposito?: string
        }
        Relationships: [
          {
            foreignKeyName: "parametros_armazenagem_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      parceiros: {
        Row: {
          ativo: boolean
          cnpj: string | null
          created_at: string | null
          email_admin: string | null
          id: string
          nome: string
          obs: string | null
        }
        Insert: {
          ativo?: boolean
          cnpj?: string | null
          created_at?: string | null
          email_admin?: string | null
          id?: string
          nome: string
          obs?: string | null
        }
        Update: {
          ativo?: boolean
          cnpj?: string | null
          created_at?: string | null
          email_admin?: string | null
          id?: string
          nome?: string
          obs?: string | null
        }
        Relationships: []
      }
      parcelas_consorcio: {
        Row: {
          consorcio_id: string
          created_at: string | null
          data_pagamento: string | null
          data_vencimento: string
          id: string
          numero_parcela: number
          observacao: string | null
          pago: boolean
          tipo_parcela: string
          valor: number
        }
        Insert: {
          consorcio_id: string
          created_at?: string | null
          data_pagamento?: string | null
          data_vencimento: string
          id?: string
          numero_parcela: number
          observacao?: string | null
          pago?: boolean
          tipo_parcela?: string
          valor?: number
        }
        Update: {
          consorcio_id?: string
          created_at?: string | null
          data_pagamento?: string | null
          data_vencimento?: string
          id?: string
          numero_parcela?: number
          observacao?: string | null
          pago?: boolean
          tipo_parcela?: string
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "parcelas_consorcio_consorcio_id_fkey"
            columns: ["consorcio_id"]
            isOneToOne: false
            referencedRelation: "consorcios"
            referencedColumns: ["id"]
          },
        ]
      }
      parcelas_liberacao: {
        Row: {
          contrato_id: string | null
          created_at: string | null
          data_liberacao: string | null
          fazenda_id: string | null
          id: string
          lancamento_id: string | null
          num_parcela: number | null
          status: string | null
          valor: number | null
          valor_liberado: number | null
          valor_liberado_brl: number | null
        }
        Insert: {
          contrato_id?: string | null
          created_at?: string | null
          data_liberacao?: string | null
          fazenda_id?: string | null
          id?: string
          lancamento_id?: string | null
          num_parcela?: number | null
          status?: string | null
          valor?: number | null
          valor_liberado?: number | null
          valor_liberado_brl?: number | null
        }
        Update: {
          contrato_id?: string | null
          created_at?: string | null
          data_liberacao?: string | null
          fazenda_id?: string | null
          id?: string
          lancamento_id?: string | null
          num_parcela?: number | null
          status?: string | null
          valor?: number | null
          valor_liberado?: number | null
          valor_liberado_brl?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "parcelas_liberacao_contrato_id_fkey"
            columns: ["contrato_id"]
            isOneToOne: false
            referencedRelation: "contratos_financeiros"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "parcelas_liberacao_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      parcelas_pagamento: {
        Row: {
          amortizacao: number | null
          contrato_id: string | null
          created_at: string | null
          data_pagamento: string | null
          data_vencimento: string | null
          despesas_acessorios: number | null
          fazenda_id: string | null
          id: string
          juros: number | null
          lancamento_id: string | null
          num_parcela: number | null
          saldo_devedor: number | null
          status: string | null
          valor_parcela: number | null
        }
        Insert: {
          amortizacao?: number | null
          contrato_id?: string | null
          created_at?: string | null
          data_pagamento?: string | null
          data_vencimento?: string | null
          despesas_acessorios?: number | null
          fazenda_id?: string | null
          id?: string
          juros?: number | null
          lancamento_id?: string | null
          num_parcela?: number | null
          saldo_devedor?: number | null
          status?: string | null
          valor_parcela?: number | null
        }
        Update: {
          amortizacao?: number | null
          contrato_id?: string | null
          created_at?: string | null
          data_pagamento?: string | null
          data_vencimento?: string | null
          despesas_acessorios?: number | null
          fazenda_id?: string | null
          id?: string
          juros?: number | null
          lancamento_id?: string | null
          num_parcela?: number | null
          saldo_devedor?: number | null
          status?: string | null
          valor_parcela?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "parcelas_pagamento_contrato_id_fkey"
            columns: ["contrato_id"]
            isOneToOne: false
            referencedRelation: "contratos_financeiros"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "parcelas_pagamento_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      pedidos_compra: {
        Row: {
          acrescimos_valor: number | null
          ano_safra_id: string | null
          antecipacao_juros_pct: number | null
          aprovador: string | null
          barter_ano_safra_id: string | null
          barter_ciclo_id: string | null
          barter_preco_saca: number | null
          barter_volume_sc: number | null
          ciclo_id: string | null
          cidade_entrega: string | null
          comprador_id: string | null
          contato_fornecedor: string | null
          cotacao_moeda: string | null
          created_at: string | null
          data_entrega_total: string | null
          data_registro: string
          data_vencimento: string | null
          deposito_previsao: string | null
          desc_antecipacao_pct: number | null
          desc_pontualidade_pct: number | null
          desconto_pct: number | null
          desconto_valor: number | null
          endereco_entrega: string | null
          entrega_unica: boolean | null
          fazenda_id: string
          fiscal: boolean | null
          forma_pagamento_nf: string | null
          fornecedor_id: string | null
          frete_tipo: string | null
          frete_total: number | null
          id: string
          ie_produtor: string | null
          lancamento_id: string | null
          meio_pagamento: string | null
          nr_pedido: string | null
          nr_pedido_fornecedor: string | null
          nr_solicitacao: string | null
          numero: number
          observacao: string | null
          operacao: string | null
          operacao_nf: string | null
          possui_ordem_compra: boolean | null
          previsao_entrega_unica: string | null
          produtor_id: string | null
          propriedade_entrega: string | null
          safra_texto: string | null
          status: string | null
          tipo: string | null
          total_financeiro: number | null
          total_produtos_servicos: number | null
          transportador: string | null
          variacao_cambial: number | null
        }
        Insert: {
          acrescimos_valor?: number | null
          ano_safra_id?: string | null
          antecipacao_juros_pct?: number | null
          aprovador?: string | null
          barter_ano_safra_id?: string | null
          barter_ciclo_id?: string | null
          barter_preco_saca?: number | null
          barter_volume_sc?: number | null
          ciclo_id?: string | null
          cidade_entrega?: string | null
          comprador_id?: string | null
          contato_fornecedor?: string | null
          cotacao_moeda?: string | null
          created_at?: string | null
          data_entrega_total?: string | null
          data_registro?: string
          data_vencimento?: string | null
          deposito_previsao?: string | null
          desc_antecipacao_pct?: number | null
          desc_pontualidade_pct?: number | null
          desconto_pct?: number | null
          desconto_valor?: number | null
          endereco_entrega?: string | null
          entrega_unica?: boolean | null
          fazenda_id: string
          fiscal?: boolean | null
          forma_pagamento_nf?: string | null
          fornecedor_id?: string | null
          frete_tipo?: string | null
          frete_total?: number | null
          id?: string
          ie_produtor?: string | null
          lancamento_id?: string | null
          meio_pagamento?: string | null
          nr_pedido?: string | null
          nr_pedido_fornecedor?: string | null
          nr_solicitacao?: string | null
          numero?: number
          observacao?: string | null
          operacao?: string | null
          operacao_nf?: string | null
          possui_ordem_compra?: boolean | null
          previsao_entrega_unica?: string | null
          produtor_id?: string | null
          propriedade_entrega?: string | null
          safra_texto?: string | null
          status?: string | null
          tipo?: string | null
          total_financeiro?: number | null
          total_produtos_servicos?: number | null
          transportador?: string | null
          variacao_cambial?: number | null
        }
        Update: {
          acrescimos_valor?: number | null
          ano_safra_id?: string | null
          antecipacao_juros_pct?: number | null
          aprovador?: string | null
          barter_ano_safra_id?: string | null
          barter_ciclo_id?: string | null
          barter_preco_saca?: number | null
          barter_volume_sc?: number | null
          ciclo_id?: string | null
          cidade_entrega?: string | null
          comprador_id?: string | null
          contato_fornecedor?: string | null
          cotacao_moeda?: string | null
          created_at?: string | null
          data_entrega_total?: string | null
          data_registro?: string
          data_vencimento?: string | null
          deposito_previsao?: string | null
          desc_antecipacao_pct?: number | null
          desc_pontualidade_pct?: number | null
          desconto_pct?: number | null
          desconto_valor?: number | null
          endereco_entrega?: string | null
          entrega_unica?: boolean | null
          fazenda_id?: string
          fiscal?: boolean | null
          forma_pagamento_nf?: string | null
          fornecedor_id?: string | null
          frete_tipo?: string | null
          frete_total?: number | null
          id?: string
          ie_produtor?: string | null
          lancamento_id?: string | null
          meio_pagamento?: string | null
          nr_pedido?: string | null
          nr_pedido_fornecedor?: string | null
          nr_solicitacao?: string | null
          numero?: number
          observacao?: string | null
          operacao?: string | null
          operacao_nf?: string | null
          possui_ordem_compra?: boolean | null
          previsao_entrega_unica?: string | null
          produtor_id?: string | null
          propriedade_entrega?: string | null
          safra_texto?: string | null
          status?: string | null
          tipo?: string | null
          total_financeiro?: number | null
          total_produtos_servicos?: number | null
          transportador?: string | null
          variacao_cambial?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "pedidos_compra_ano_safra_id_fkey"
            columns: ["ano_safra_id"]
            isOneToOne: false
            referencedRelation: "anos_safra"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pedidos_compra_barter_ano_safra_id_fkey"
            columns: ["barter_ano_safra_id"]
            isOneToOne: false
            referencedRelation: "anos_safra"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pedidos_compra_barter_ciclo_id_fkey"
            columns: ["barter_ciclo_id"]
            isOneToOne: false
            referencedRelation: "ciclos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pedidos_compra_ciclo_id_fkey"
            columns: ["ciclo_id"]
            isOneToOne: false
            referencedRelation: "ciclos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pedidos_compra_comprador_id_fkey"
            columns: ["comprador_id"]
            isOneToOne: false
            referencedRelation: "pessoas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pedidos_compra_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pedidos_compra_fornecedor_id_fkey"
            columns: ["fornecedor_id"]
            isOneToOne: false
            referencedRelation: "pessoas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pedidos_compra_produtor_id_fkey"
            columns: ["produtor_id"]
            isOneToOne: false
            referencedRelation: "produtores"
            referencedColumns: ["id"]
          },
        ]
      }
      pedidos_compra_entregas: {
        Row: {
          created_at: string | null
          data_entrega: string
          fazenda_id: string
          id: string
          item_id: string | null
          nf_entrada_id: string | null
          observacao: string | null
          pedido_id: string
          quantidade_entregue: number
          valor_entregue: number | null
        }
        Insert: {
          created_at?: string | null
          data_entrega: string
          fazenda_id: string
          id?: string
          item_id?: string | null
          nf_entrada_id?: string | null
          observacao?: string | null
          pedido_id: string
          quantidade_entregue: number
          valor_entregue?: number | null
        }
        Update: {
          created_at?: string | null
          data_entrega?: string
          fazenda_id?: string
          id?: string
          item_id?: string | null
          nf_entrada_id?: string | null
          observacao?: string | null
          pedido_id?: string
          quantidade_entregue?: number
          valor_entregue?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "pedidos_compra_entregas_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pedidos_compra_entregas_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "pedidos_compra_itens"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pedidos_compra_entregas_nf_entrada_id_fkey"
            columns: ["nf_entrada_id"]
            isOneToOne: false
            referencedRelation: "nf_entradas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pedidos_compra_entregas_pedido_id_fkey"
            columns: ["pedido_id"]
            isOneToOne: false
            referencedRelation: "pedidos_compra"
            referencedColumns: ["id"]
          },
        ]
      }
      pedidos_compra_itens: {
        Row: {
          centro_custo_id: string | null
          created_at: string | null
          desconto_unitario: number
          fazenda_id: string
          id: string
          insumo_id: string | null
          nome_item: string
          pedido_id: string
          qtd_cancelada: number | null
          qtd_entregue: number | null
          quantidade: number
          tipo_item: string | null
          unidade: string
          valor_unitario: number
        }
        Insert: {
          centro_custo_id?: string | null
          created_at?: string | null
          desconto_unitario?: number
          fazenda_id: string
          id?: string
          insumo_id?: string | null
          nome_item: string
          pedido_id: string
          qtd_cancelada?: number | null
          qtd_entregue?: number | null
          quantidade?: number
          tipo_item?: string | null
          unidade?: string
          valor_unitario?: number
        }
        Update: {
          centro_custo_id?: string | null
          created_at?: string | null
          desconto_unitario?: number
          fazenda_id?: string
          id?: string
          insumo_id?: string | null
          nome_item?: string
          pedido_id?: string
          qtd_cancelada?: number | null
          qtd_entregue?: number | null
          quantidade?: number
          tipo_item?: string | null
          unidade?: string
          valor_unitario?: number
        }
        Relationships: [
          {
            foreignKeyName: "pedidos_compra_itens_centro_custo_id_fkey"
            columns: ["centro_custo_id"]
            isOneToOne: false
            referencedRelation: "centros_custo"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pedidos_compra_itens_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pedidos_compra_itens_insumo_id_fkey"
            columns: ["insumo_id"]
            isOneToOne: false
            referencedRelation: "insumos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pedidos_compra_itens_pedido_id_fkey"
            columns: ["pedido_id"]
            isOneToOne: false
            referencedRelation: "pedidos_compra"
            referencedColumns: ["id"]
          },
        ]
      }
      pendencias_fiscais: {
        Row: {
          abastecimento_id: string | null
          chave_acesso: string | null
          created_at: string | null
          data_operacao: string
          descricao: string
          fazenda_id: string
          fornecedor_nome: string | null
          id: string
          lancamento_id: string | null
          movimentacao_id: string | null
          observacoes: string | null
          origem: string | null
          status: string
          tipo: string
          updated_at: string | null
          valor: number | null
          xml_storage_path: string | null
        }
        Insert: {
          abastecimento_id?: string | null
          chave_acesso?: string | null
          created_at?: string | null
          data_operacao?: string
          descricao: string
          fazenda_id: string
          fornecedor_nome?: string | null
          id?: string
          lancamento_id?: string | null
          movimentacao_id?: string | null
          observacoes?: string | null
          origem?: string | null
          status?: string
          tipo?: string
          updated_at?: string | null
          valor?: number | null
          xml_storage_path?: string | null
        }
        Update: {
          abastecimento_id?: string | null
          chave_acesso?: string | null
          created_at?: string | null
          data_operacao?: string
          descricao?: string
          fazenda_id?: string
          fornecedor_nome?: string | null
          id?: string
          lancamento_id?: string | null
          movimentacao_id?: string | null
          observacoes?: string | null
          origem?: string | null
          status?: string
          tipo?: string
          updated_at?: string | null
          valor?: number | null
          xml_storage_path?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pendencias_fiscais_abastecimento_id_fkey"
            columns: ["abastecimento_id"]
            isOneToOne: false
            referencedRelation: "abastecimentos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pendencias_fiscais_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pendencias_fiscais_lancamento_id_fkey"
            columns: ["lancamento_id"]
            isOneToOne: false
            referencedRelation: "lancamentos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pendencias_fiscais_movimentacao_id_fkey"
            columns: ["movimentacao_id"]
            isOneToOne: false
            referencedRelation: "movimentacoes_estoque"
            referencedColumns: ["id"]
          },
        ]
      }
      pendencias_operacionais: {
        Row: {
          criado_em: string | null
          dados_originais: Json
          descricao: string | null
          fazenda_id: string
          id: string
          motivo: string | null
          operacao_id: string | null
          origem: string | null
          produto_nome_pendente: string | null
          resolvido_em: string | null
          status: string
          subtipo: string | null
          talhao_nome_pendente: string | null
          tipo: string
          usuario_nome: string | null
          usuario_whatsapp: string | null
        }
        Insert: {
          criado_em?: string | null
          dados_originais?: Json
          descricao?: string | null
          fazenda_id: string
          id?: string
          motivo?: string | null
          operacao_id?: string | null
          origem?: string | null
          produto_nome_pendente?: string | null
          resolvido_em?: string | null
          status?: string
          subtipo?: string | null
          talhao_nome_pendente?: string | null
          tipo?: string
          usuario_nome?: string | null
          usuario_whatsapp?: string | null
        }
        Update: {
          criado_em?: string | null
          dados_originais?: Json
          descricao?: string | null
          fazenda_id?: string
          id?: string
          motivo?: string | null
          operacao_id?: string | null
          origem?: string | null
          produto_nome_pendente?: string | null
          resolvido_em?: string | null
          status?: string
          subtipo?: string | null
          talhao_nome_pendente?: string | null
          tipo?: string
          usuario_nome?: string | null
          usuario_whatsapp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pendencias_operacionais_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      perfis: {
        Row: {
          bpo_nivel: string | null
          conta_id: string | null
          created_at: string | null
          fazenda_id: string | null
          fazendas_permitidas: string[] | null
          id: string
          nome: string | null
          papel: string
          parceiro_id: string | null
          produto: string
          role: string | null
          user_id: string
        }
        Insert: {
          bpo_nivel?: string | null
          conta_id?: string | null
          created_at?: string | null
          fazenda_id?: string | null
          fazendas_permitidas?: string[] | null
          id?: string
          nome?: string | null
          papel?: string
          parceiro_id?: string | null
          produto?: string
          role?: string | null
          user_id: string
        }
        Update: {
          bpo_nivel?: string | null
          conta_id?: string | null
          created_at?: string | null
          fazenda_id?: string | null
          fazendas_permitidas?: string[] | null
          id?: string
          nome?: string | null
          papel?: string
          parceiro_id?: string | null
          produto?: string
          role?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "perfis_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "contas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "perfis_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "perfis_parceiro_id_fkey"
            columns: ["parceiro_id"]
            isOneToOne: false
            referencedRelation: "parceiros"
            referencedColumns: ["id"]
          },
        ]
      }
      pesagens_avulsas: {
        Row: {
          conta_id: string | null
          created_at: string | null
          data_bruto: string | null
          data_tara: string | null
          fazenda_id: string
          fornecedor_cliente: string | null
          id: string
          motorista: string | null
          observacao: string | null
          peso_bruto_kg: number | null
          peso_liquido_kg: number | null
          peso_tara_kg: number | null
          placa: string | null
          produto: string | null
          status: string
          tipo: string
          usuario_bruto: string | null
          usuario_tara: string | null
        }
        Insert: {
          conta_id?: string | null
          created_at?: string | null
          data_bruto?: string | null
          data_tara?: string | null
          fazenda_id: string
          fornecedor_cliente?: string | null
          id?: string
          motorista?: string | null
          observacao?: string | null
          peso_bruto_kg?: number | null
          peso_liquido_kg?: number | null
          peso_tara_kg?: number | null
          placa?: string | null
          produto?: string | null
          status?: string
          tipo?: string
          usuario_bruto?: string | null
          usuario_tara?: string | null
        }
        Update: {
          conta_id?: string | null
          created_at?: string | null
          data_bruto?: string | null
          data_tara?: string | null
          fazenda_id?: string
          fornecedor_cliente?: string | null
          id?: string
          motorista?: string | null
          observacao?: string | null
          peso_bruto_kg?: number | null
          peso_liquido_kg?: number | null
          peso_tara_kg?: number | null
          placa?: string | null
          produto?: string | null
          status?: string
          tipo?: string
          usuario_bruto?: string | null
          usuario_tara?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pesagens_avulsas_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "contas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pesagens_avulsas_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      pessoas: {
        Row: {
          bairro: string | null
          banco_agencia: string | null
          banco_conta: string | null
          banco_nome: string | null
          banco_tipo: string | null
          cep: string | null
          cliente: boolean
          cnae: string | null
          complemento: string | null
          cpf_cnpj: string | null
          created_at: string | null
          email: string | null
          estado: string | null
          fazenda_id: string
          fornecedor: boolean
          id: string
          importado_sieg: boolean | null
          inscricao_est: string | null
          inscricao_mun: string | null
          logradouro: string | null
          mao_obra: boolean | null
          municipio: string | null
          municipio_ibge: string | null
          nome: string
          nome_contato: string | null
          numero: string | null
          og_padrao_id: string | null
          pix_chave: string | null
          pix_tipo: string | null
          regime_tributario: string | null
          situacao_cadastral: string | null
          subcategorias: string[] | null
          telefone: string | null
          telefone_contato: string | null
          tipo: string
        }
        Insert: {
          bairro?: string | null
          banco_agencia?: string | null
          banco_conta?: string | null
          banco_nome?: string | null
          banco_tipo?: string | null
          cep?: string | null
          cliente?: boolean
          cnae?: string | null
          complemento?: string | null
          cpf_cnpj?: string | null
          created_at?: string | null
          email?: string | null
          estado?: string | null
          fazenda_id: string
          fornecedor?: boolean
          id?: string
          importado_sieg?: boolean | null
          inscricao_est?: string | null
          inscricao_mun?: string | null
          logradouro?: string | null
          mao_obra?: boolean | null
          municipio?: string | null
          municipio_ibge?: string | null
          nome: string
          nome_contato?: string | null
          numero?: string | null
          og_padrao_id?: string | null
          pix_chave?: string | null
          pix_tipo?: string | null
          regime_tributario?: string | null
          situacao_cadastral?: string | null
          subcategorias?: string[] | null
          telefone?: string | null
          telefone_contato?: string | null
          tipo: string
        }
        Update: {
          bairro?: string | null
          banco_agencia?: string | null
          banco_conta?: string | null
          banco_nome?: string | null
          banco_tipo?: string | null
          cep?: string | null
          cliente?: boolean
          cnae?: string | null
          complemento?: string | null
          cpf_cnpj?: string | null
          created_at?: string | null
          email?: string | null
          estado?: string | null
          fazenda_id?: string
          fornecedor?: boolean
          id?: string
          importado_sieg?: boolean | null
          inscricao_est?: string | null
          inscricao_mun?: string | null
          logradouro?: string | null
          mao_obra?: boolean | null
          municipio?: string | null
          municipio_ibge?: string | null
          nome?: string
          nome_contato?: string | null
          numero?: string | null
          og_padrao_id?: string | null
          pix_chave?: string | null
          pix_tipo?: string | null
          regime_tributario?: string | null
          situacao_cadastral?: string | null
          subcategorias?: string[] | null
          telefone?: string | null
          telefone_contato?: string | null
          tipo?: string
        }
        Relationships: [
          {
            foreignKeyName: "pessoas_og_padrao_id_fkey"
            columns: ["og_padrao_id"]
            isOneToOne: false
            referencedRelation: "operacoes_gerenciais"
            referencedColumns: ["id"]
          },
        ]
      }
      planejamento_tarefas: {
        Row: {
          ciclo_id: string | null
          created_at: string | null
          data_conclusao: string | null
          data_prevista: string | null
          descricao: string | null
          fazenda_id: string
          id: string
          observacoes: string | null
          prioridade: string
          responsavel: string | null
          status: string
          tipo: string
          titulo: string
        }
        Insert: {
          ciclo_id?: string | null
          created_at?: string | null
          data_conclusao?: string | null
          data_prevista?: string | null
          descricao?: string | null
          fazenda_id: string
          id?: string
          observacoes?: string | null
          prioridade?: string
          responsavel?: string | null
          status?: string
          tipo?: string
          titulo: string
        }
        Update: {
          ciclo_id?: string | null
          created_at?: string | null
          data_conclusao?: string | null
          data_prevista?: string | null
          descricao?: string | null
          fazenda_id?: string
          id?: string
          observacoes?: string | null
          prioridade?: string
          responsavel?: string | null
          status?: string
          tipo?: string
          titulo?: string
        }
        Relationships: [
          {
            foreignKeyName: "planejamento_tarefas_ciclo_id_fkey"
            columns: ["ciclo_id"]
            isOneToOne: false
            referencedRelation: "safras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "planejamento_tarefas_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      plano_contas: {
        Row: {
          codigo: string
          created_at: string | null
          fazenda_id: string
          id: string
          lcdpr: string | null
          natureza: string | null
          nivel: number
          nome: string
          operacional: boolean | null
          pai: string | null
          tipo: string
          transitoria: boolean | null
        }
        Insert: {
          codigo: string
          created_at?: string | null
          fazenda_id: string
          id?: string
          lcdpr?: string | null
          natureza?: string | null
          nivel?: number
          nome: string
          operacional?: boolean | null
          pai?: string | null
          tipo: string
          transitoria?: boolean | null
        }
        Update: {
          codigo?: string
          created_at?: string | null
          fazenda_id?: string
          id?: string
          lcdpr?: string | null
          natureza?: string | null
          nivel?: number
          nome?: string
          operacional?: boolean | null
          pai?: string | null
          tipo?: string
          transitoria?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "plano_contas_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      planos: {
        Row: {
          ativo: boolean
          descricao: string | null
          destaque: boolean
          features_marketing: string[] | null
          id: string
          limite_usuarios: number | null
          modulos: string[]
          nome: string
          ordem: number
          preco_anual: number | null
          preco_mensal: number
          storage_gb: number
          trial_dias: number
        }
        Insert: {
          ativo?: boolean
          descricao?: string | null
          destaque?: boolean
          features_marketing?: string[] | null
          id: string
          limite_usuarios?: number | null
          modulos?: string[]
          nome: string
          ordem?: number
          preco_anual?: number | null
          preco_mensal?: number
          storage_gb?: number
          trial_dias?: number
        }
        Update: {
          ativo?: boolean
          descricao?: string | null
          destaque?: boolean
          features_marketing?: string[] | null
          id?: string
          limite_usuarios?: number | null
          modulos?: string[]
          nome?: string
          ordem?: number
          preco_anual?: number | null
          preco_mensal?: number
          storage_gb?: number
          trial_dias?: number
        }
        Relationships: []
      }
      planos_config: {
        Row: {
          plano_id: string
          preco_mensal: number
          updated_at: string
        }
        Insert: {
          plano_id: string
          preco_mensal: number
          updated_at?: string
        }
        Update: {
          plano_id?: string
          preco_mensal?: number
          updated_at?: string
        }
        Relationships: []
      }
      plantios: {
        Row: {
          aprovado_em: string | null
          aprovado_por_perfil_id: string | null
          area_ha: number | null
          ciclo_id: string | null
          created_at: string | null
          custo_semente_total: number | null
          custo_sementes: number | null
          data_colheita_prev: string | null
          data_plantio: string
          dose_kg_ha: number | null
          dose_kg_ha_recomendada: number | null
          fazenda_id: string | null
          id: string
          insumo_id: string | null
          lancado_por_perfil_id: string | null
          lancamento_id: string | null
          lote_semente: string | null
          maquina_id: string | null
          moeda: string | null
          motivo_rejeicao: string | null
          observacao: string | null
          origem_lancamento: string
          origem_op_id: string | null
          preco_esperado_sc: number | null
          produtividade_esperada: number | null
          quantidade_kg: number | null
          quantidade_semente_kg: number | null
          receita_esperada: number | null
          safra_id: string | null
          status_campo: string
          talhao_id: string | null
          variedade: string | null
        }
        Insert: {
          aprovado_em?: string | null
          aprovado_por_perfil_id?: string | null
          area_ha?: number | null
          ciclo_id?: string | null
          created_at?: string | null
          custo_semente_total?: number | null
          custo_sementes?: number | null
          data_colheita_prev?: string | null
          data_plantio: string
          dose_kg_ha?: number | null
          dose_kg_ha_recomendada?: number | null
          fazenda_id?: string | null
          id?: string
          insumo_id?: string | null
          lancado_por_perfil_id?: string | null
          lancamento_id?: string | null
          lote_semente?: string | null
          maquina_id?: string | null
          moeda?: string | null
          motivo_rejeicao?: string | null
          observacao?: string | null
          origem_lancamento?: string
          origem_op_id?: string | null
          preco_esperado_sc?: number | null
          produtividade_esperada?: number | null
          quantidade_kg?: number | null
          quantidade_semente_kg?: number | null
          receita_esperada?: number | null
          safra_id?: string | null
          status_campo?: string
          talhao_id?: string | null
          variedade?: string | null
        }
        Update: {
          aprovado_em?: string | null
          aprovado_por_perfil_id?: string | null
          area_ha?: number | null
          ciclo_id?: string | null
          created_at?: string | null
          custo_semente_total?: number | null
          custo_sementes?: number | null
          data_colheita_prev?: string | null
          data_plantio?: string
          dose_kg_ha?: number | null
          dose_kg_ha_recomendada?: number | null
          fazenda_id?: string | null
          id?: string
          insumo_id?: string | null
          lancado_por_perfil_id?: string | null
          lancamento_id?: string | null
          lote_semente?: string | null
          maquina_id?: string | null
          moeda?: string | null
          motivo_rejeicao?: string | null
          observacao?: string | null
          origem_lancamento?: string
          origem_op_id?: string | null
          preco_esperado_sc?: number | null
          produtividade_esperada?: number | null
          quantidade_kg?: number | null
          quantidade_semente_kg?: number | null
          receita_esperada?: number | null
          safra_id?: string | null
          status_campo?: string
          talhao_id?: string | null
          variedade?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "plantios_aprovado_por_perfil_id_fkey"
            columns: ["aprovado_por_perfil_id"]
            isOneToOne: false
            referencedRelation: "perfis"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plantios_ciclo_id_fkey"
            columns: ["ciclo_id"]
            isOneToOne: false
            referencedRelation: "ciclos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plantios_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plantios_insumo_id_fkey"
            columns: ["insumo_id"]
            isOneToOne: false
            referencedRelation: "insumos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plantios_lancado_por_perfil_id_fkey"
            columns: ["lancado_por_perfil_id"]
            isOneToOne: false
            referencedRelation: "perfis"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plantios_maquina_id_fkey"
            columns: ["maquina_id"]
            isOneToOne: false
            referencedRelation: "maquinas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plantios_safra_id_fkey"
            columns: ["safra_id"]
            isOneToOne: false
            referencedRelation: "safras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plantios_talhao_id_fkey"
            columns: ["talhao_id"]
            isOneToOne: false
            referencedRelation: "talhoes"
            referencedColumns: ["id"]
          },
        ]
      }
      principios_ativos: {
        Row: {
          categoria: string
          created_at: string | null
          id: string
          nome: string
          observacao: string | null
          unidade: string
        }
        Insert: {
          categoria?: string
          created_at?: string | null
          id?: string
          nome: string
          observacao?: string | null
          unidade?: string
        }
        Update: {
          categoria?: string
          created_at?: string | null
          id?: string
          nome?: string
          observacao?: string | null
          unidade?: string
        }
        Relationships: []
      }
      produtor_inscricoes_estaduais: {
        Row: {
          ativa: boolean
          bairro: string | null
          cep: string | null
          complemento: string | null
          created_at: string | null
          empresa_id: string | null
          estado: string
          fazenda_id: string | null
          id: string
          inscricao_estadual: string
          logradouro: string | null
          municipio: string | null
          municipio_ibge: string | null
          numero: string | null
          produtor_id: string
        }
        Insert: {
          ativa?: boolean
          bairro?: string | null
          cep?: string | null
          complemento?: string | null
          created_at?: string | null
          empresa_id?: string | null
          estado?: string
          fazenda_id?: string | null
          id?: string
          inscricao_estadual: string
          logradouro?: string | null
          municipio?: string | null
          municipio_ibge?: string | null
          numero?: string | null
          produtor_id: string
        }
        Update: {
          ativa?: boolean
          bairro?: string | null
          cep?: string | null
          complemento?: string | null
          created_at?: string | null
          empresa_id?: string | null
          estado?: string
          fazenda_id?: string | null
          id?: string
          inscricao_estadual?: string
          logradouro?: string | null
          municipio?: string | null
          municipio_ibge?: string | null
          numero?: string | null
          produtor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "produtor_inscricoes_estaduais_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "produtor_inscricoes_estaduais_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "produtor_inscricoes_estaduais_produtor_id_fkey"
            columns: ["produtor_id"]
            isOneToOne: false
            referencedRelation: "produtores"
            referencedColumns: ["id"]
          },
        ]
      }
      produtores: {
        Row: {
          bairro: string | null
          cep: string | null
          complemento: string | null
          conta_id: string | null
          cpf_cnpj: string | null
          created_at: string | null
          email: string | null
          estado: string | null
          fazenda_id: string
          id: string
          incra: string | null
          inscricao_est: string | null
          logradouro: string | null
          municipio: string | null
          municipio_ibge: string | null
          nome: string
          numero: string | null
          telefone: string | null
          tipo: string
        }
        Insert: {
          bairro?: string | null
          cep?: string | null
          complemento?: string | null
          conta_id?: string | null
          cpf_cnpj?: string | null
          created_at?: string | null
          email?: string | null
          estado?: string | null
          fazenda_id: string
          id?: string
          incra?: string | null
          inscricao_est?: string | null
          logradouro?: string | null
          municipio?: string | null
          municipio_ibge?: string | null
          nome: string
          numero?: string | null
          telefone?: string | null
          tipo: string
        }
        Update: {
          bairro?: string | null
          cep?: string | null
          complemento?: string | null
          conta_id?: string | null
          cpf_cnpj?: string | null
          created_at?: string | null
          email?: string | null
          estado?: string | null
          fazenda_id?: string
          id?: string
          incra?: string | null
          inscricao_est?: string | null
          logradouro?: string | null
          municipio?: string | null
          municipio_ibge?: string | null
          nome?: string
          numero?: string | null
          telefone?: string | null
          tipo?: string
        }
        Relationships: [
          {
            foreignKeyName: "produtores_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "contas"
            referencedColumns: ["id"]
          },
        ]
      }
      pulverizacao_itens: {
        Row: {
          created_at: string | null
          custo_ha: number | null
          custo_total: number | null
          dose_ha: number | null
          dose_recomendada_ha: number | null
          fazenda_id: string | null
          id: string
          insumo_id: string | null
          nome_produto: string
          pulverizacao_id: string | null
          total_consumido: number | null
          unidade: string | null
          valor_unitario: number | null
        }
        Insert: {
          created_at?: string | null
          custo_ha?: number | null
          custo_total?: number | null
          dose_ha?: number | null
          dose_recomendada_ha?: number | null
          fazenda_id?: string | null
          id?: string
          insumo_id?: string | null
          nome_produto: string
          pulverizacao_id?: string | null
          total_consumido?: number | null
          unidade?: string | null
          valor_unitario?: number | null
        }
        Update: {
          created_at?: string | null
          custo_ha?: number | null
          custo_total?: number | null
          dose_ha?: number | null
          dose_recomendada_ha?: number | null
          fazenda_id?: string | null
          id?: string
          insumo_id?: string | null
          nome_produto?: string
          pulverizacao_id?: string | null
          total_consumido?: number | null
          unidade?: string | null
          valor_unitario?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "pulverizacao_itens_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pulverizacao_itens_insumo_id_fkey"
            columns: ["insumo_id"]
            isOneToOne: false
            referencedRelation: "insumos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pulverizacao_itens_pulverizacao_id_fkey"
            columns: ["pulverizacao_id"]
            isOneToOne: false
            referencedRelation: "pulverizacoes"
            referencedColumns: ["id"]
          },
        ]
      }
      pulverizacoes: {
        Row: {
          aprovado_em: string | null
          aprovado_por_perfil_id: string | null
          area_ha: number | null
          calda_total_l: number | null
          cap_tanque_l: number | null
          ciclo_id: string | null
          created_at: string | null
          custo_total: number | null
          data_fim: string | null
          data_inicio: string
          estadio_fenologico: string | null
          fazenda_id: string | null
          fiscal: boolean | null
          id: string
          lancado_por_perfil_id: string | null
          lancamento_id: string | null
          maquina_id: string | null
          motivo_rejeicao: string | null
          num_tanques: number | null
          observacao: string | null
          origem_lancamento: string
          origem_op_id: string | null
          pre_pos: string | null
          safra_id: string | null
          status_campo: string
          talhao_id: string | null
          tipo: string
          vazao_l_ha: number | null
        }
        Insert: {
          aprovado_em?: string | null
          aprovado_por_perfil_id?: string | null
          area_ha?: number | null
          calda_total_l?: number | null
          cap_tanque_l?: number | null
          ciclo_id?: string | null
          created_at?: string | null
          custo_total?: number | null
          data_fim?: string | null
          data_inicio: string
          estadio_fenologico?: string | null
          fazenda_id?: string | null
          fiscal?: boolean | null
          id?: string
          lancado_por_perfil_id?: string | null
          lancamento_id?: string | null
          maquina_id?: string | null
          motivo_rejeicao?: string | null
          num_tanques?: number | null
          observacao?: string | null
          origem_lancamento?: string
          origem_op_id?: string | null
          pre_pos?: string | null
          safra_id?: string | null
          status_campo?: string
          talhao_id?: string | null
          tipo: string
          vazao_l_ha?: number | null
        }
        Update: {
          aprovado_em?: string | null
          aprovado_por_perfil_id?: string | null
          area_ha?: number | null
          calda_total_l?: number | null
          cap_tanque_l?: number | null
          ciclo_id?: string | null
          created_at?: string | null
          custo_total?: number | null
          data_fim?: string | null
          data_inicio?: string
          estadio_fenologico?: string | null
          fazenda_id?: string | null
          fiscal?: boolean | null
          id?: string
          lancado_por_perfil_id?: string | null
          lancamento_id?: string | null
          maquina_id?: string | null
          motivo_rejeicao?: string | null
          num_tanques?: number | null
          observacao?: string | null
          origem_lancamento?: string
          origem_op_id?: string | null
          pre_pos?: string | null
          safra_id?: string | null
          status_campo?: string
          talhao_id?: string | null
          tipo?: string
          vazao_l_ha?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "pulverizacoes_aprovado_por_perfil_id_fkey"
            columns: ["aprovado_por_perfil_id"]
            isOneToOne: false
            referencedRelation: "perfis"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pulverizacoes_ciclo_id_fkey"
            columns: ["ciclo_id"]
            isOneToOne: false
            referencedRelation: "ciclos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pulverizacoes_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pulverizacoes_lancado_por_perfil_id_fkey"
            columns: ["lancado_por_perfil_id"]
            isOneToOne: false
            referencedRelation: "perfis"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pulverizacoes_maquina_id_fkey"
            columns: ["maquina_id"]
            isOneToOne: false
            referencedRelation: "maquinas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pulverizacoes_safra_id_fkey"
            columns: ["safra_id"]
            isOneToOne: false
            referencedRelation: "safras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pulverizacoes_talhao_id_fkey"
            columns: ["talhao_id"]
            isOneToOne: false
            referencedRelation: "talhoes"
            referencedColumns: ["id"]
          },
        ]
      }
      raccotlo_usuario_contas: {
        Row: {
          conta_id: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          conta_id?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          conta_id?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "raccotlo_usuario_contas_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "contas"
            referencedColumns: ["id"]
          },
        ]
      }
      rateio_global_ciclos: {
        Row: {
          ciclo_id: string
          created_at: string | null
          descricao: string | null
          id: string
          ordem: number | null
          percentual: number
          rateio_fazenda_id: string
        }
        Insert: {
          ciclo_id: string
          created_at?: string | null
          descricao?: string | null
          id?: string
          ordem?: number | null
          percentual: number
          rateio_fazenda_id: string
        }
        Update: {
          ciclo_id?: string
          created_at?: string | null
          descricao?: string | null
          id?: string
          ordem?: number | null
          percentual?: number
          rateio_fazenda_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "rateio_global_ciclos_ciclo_id_fkey"
            columns: ["ciclo_id"]
            isOneToOne: false
            referencedRelation: "ciclos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rateio_global_ciclos_rateio_fazenda_id_fkey"
            columns: ["rateio_fazenda_id"]
            isOneToOne: false
            referencedRelation: "rateio_global_fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      rateio_global_fazendas: {
        Row: {
          created_at: string | null
          fazenda_id: string
          id: string
          ordem: number | null
          percentual: number
          regra_global_id: string
        }
        Insert: {
          created_at?: string | null
          fazenda_id: string
          id?: string
          ordem?: number | null
          percentual: number
          regra_global_id: string
        }
        Update: {
          created_at?: string | null
          fazenda_id?: string
          id?: string
          ordem?: number | null
          percentual?: number
          regra_global_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "rateio_global_fazendas_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rateio_global_fazendas_regra_global_id_fkey"
            columns: ["regra_global_id"]
            isOneToOne: false
            referencedRelation: "regras_rateio_global"
            referencedColumns: ["id"]
          },
        ]
      }
      recomendacao_execucoes: {
        Row: {
          created_at: string | null
          data_fim: string | null
          data_inicio: string | null
          id: string
          observacoes: string | null
          operador_nome: string | null
          origem: string | null
          recomendacao_id: string | null
          sincronizado_em: string | null
        }
        Insert: {
          created_at?: string | null
          data_fim?: string | null
          data_inicio?: string | null
          id?: string
          observacoes?: string | null
          operador_nome?: string | null
          origem?: string | null
          recomendacao_id?: string | null
          sincronizado_em?: string | null
        }
        Update: {
          created_at?: string | null
          data_fim?: string | null
          data_inicio?: string | null
          id?: string
          observacoes?: string | null
          operador_nome?: string | null
          origem?: string | null
          recomendacao_id?: string | null
          sincronizado_em?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recomendacao_execucoes_recomendacao_id_fkey"
            columns: ["recomendacao_id"]
            isOneToOne: false
            referencedRelation: "recomendacoes"
            referencedColumns: ["id"]
          },
        ]
      }
      recomendacao_produtos: {
        Row: {
          dose_ha: number
          id: string
          insumo_id: string | null
          ordem: number | null
          produto_nome: string
          quantidade_total: number | null
          recomendacao_id: string | null
          unidade: string
        }
        Insert: {
          dose_ha: number
          id?: string
          insumo_id?: string | null
          ordem?: number | null
          produto_nome: string
          quantidade_total?: number | null
          recomendacao_id?: string | null
          unidade?: string
        }
        Update: {
          dose_ha?: number
          id?: string
          insumo_id?: string | null
          ordem?: number | null
          produto_nome?: string
          quantidade_total?: number | null
          recomendacao_id?: string | null
          unidade?: string
        }
        Relationships: [
          {
            foreignKeyName: "recomendacao_produtos_insumo_id_fkey"
            columns: ["insumo_id"]
            isOneToOne: false
            referencedRelation: "insumos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recomendacao_produtos_recomendacao_id_fkey"
            columns: ["recomendacao_id"]
            isOneToOne: false
            referencedRelation: "recomendacoes"
            referencedColumns: ["id"]
          },
        ]
      }
      recomendacao_talhoes: {
        Row: {
          area_executada_ha: number | null
          area_recomendada_ha: number
          concluido: boolean | null
          id: string
          ordem: number | null
          recomendacao_id: string | null
          talhao_id: string | null
          talhao_nome: string
        }
        Insert: {
          area_executada_ha?: number | null
          area_recomendada_ha: number
          concluido?: boolean | null
          id?: string
          ordem?: number | null
          recomendacao_id?: string | null
          talhao_id?: string | null
          talhao_nome: string
        }
        Update: {
          area_executada_ha?: number | null
          area_recomendada_ha?: number
          concluido?: boolean | null
          id?: string
          ordem?: number | null
          recomendacao_id?: string | null
          talhao_id?: string | null
          talhao_nome?: string
        }
        Relationships: [
          {
            foreignKeyName: "recomendacao_talhoes_recomendacao_id_fkey"
            columns: ["recomendacao_id"]
            isOneToOne: false
            referencedRelation: "recomendacoes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recomendacao_talhoes_talhao_id_fkey"
            columns: ["talhao_id"]
            isOneToOne: false
            referencedRelation: "talhoes"
            referencedColumns: ["id"]
          },
        ]
      }
      recomendacoes: {
        Row: {
          agronomo_crea: string | null
          agronomo_nome: string | null
          area_total_recomendada_ha: number | null
          bico: string | null
          cap_tanque_l: number | null
          ciclo_id: string | null
          codigo: string | null
          created_at: string | null
          data_prevista_fim: string | null
          data_prevista_inicio: string | null
          data_recomendacao: string
          fazenda_id: string
          id: string
          observacoes: string | null
          ph_max: number | null
          ph_min: number | null
          pressao_max: number | null
          pressao_min: number | null
          remonte_pct: number | null
          status: string | null
          temperatura_max: number | null
          temperatura_min: number | null
          tipo: string
          umidade_max: number | null
          umidade_min: number | null
          updated_at: string | null
          vazao_lha: number | null
          velocidade_max: number | null
          velocidade_min: number | null
          vento_max: number | null
        }
        Insert: {
          agronomo_crea?: string | null
          agronomo_nome?: string | null
          area_total_recomendada_ha?: number | null
          bico?: string | null
          cap_tanque_l?: number | null
          ciclo_id?: string | null
          codigo?: string | null
          created_at?: string | null
          data_prevista_fim?: string | null
          data_prevista_inicio?: string | null
          data_recomendacao?: string
          fazenda_id: string
          id?: string
          observacoes?: string | null
          ph_max?: number | null
          ph_min?: number | null
          pressao_max?: number | null
          pressao_min?: number | null
          remonte_pct?: number | null
          status?: string | null
          temperatura_max?: number | null
          temperatura_min?: number | null
          tipo: string
          umidade_max?: number | null
          umidade_min?: number | null
          updated_at?: string | null
          vazao_lha?: number | null
          velocidade_max?: number | null
          velocidade_min?: number | null
          vento_max?: number | null
        }
        Update: {
          agronomo_crea?: string | null
          agronomo_nome?: string | null
          area_total_recomendada_ha?: number | null
          bico?: string | null
          cap_tanque_l?: number | null
          ciclo_id?: string | null
          codigo?: string | null
          created_at?: string | null
          data_prevista_fim?: string | null
          data_prevista_inicio?: string | null
          data_recomendacao?: string
          fazenda_id?: string
          id?: string
          observacoes?: string | null
          ph_max?: number | null
          ph_min?: number | null
          pressao_max?: number | null
          pressao_min?: number | null
          remonte_pct?: number | null
          status?: string | null
          temperatura_max?: number | null
          temperatura_min?: number | null
          tipo?: string
          umidade_max?: number | null
          umidade_min?: number | null
          updated_at?: string | null
          vazao_lha?: number | null
          velocidade_max?: number | null
          velocidade_min?: number | null
          vento_max?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "recomendacoes_ciclo_id_fkey"
            columns: ["ciclo_id"]
            isOneToOne: false
            referencedRelation: "ciclos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recomendacoes_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      recomendacoes_adubacao: {
        Row: {
          ciclo_id: string
          criado_em: string
          criado_por_perfil_id: string
          data_aplicacao_indicada: string
          data_aplicacao_realizada: string | null
          data_recomendacao: string
          fazenda_id: string
          hectares_realizados: number | null
          hectares_sugeridos: number
          id: string
          maquina_id: string | null
          modalidade: string
          observacoes: string | null
          profundidade_aplicacao_cm: number | null
        }
        Insert: {
          ciclo_id: string
          criado_em?: string
          criado_por_perfil_id: string
          data_aplicacao_indicada: string
          data_aplicacao_realizada?: string | null
          data_recomendacao?: string
          fazenda_id: string
          hectares_realizados?: number | null
          hectares_sugeridos: number
          id?: string
          maquina_id?: string | null
          modalidade?: string
          observacoes?: string | null
          profundidade_aplicacao_cm?: number | null
        }
        Update: {
          ciclo_id?: string
          criado_em?: string
          criado_por_perfil_id?: string
          data_aplicacao_indicada?: string
          data_aplicacao_realizada?: string | null
          data_recomendacao?: string
          fazenda_id?: string
          hectares_realizados?: number | null
          hectares_sugeridos?: number
          id?: string
          maquina_id?: string | null
          modalidade?: string
          observacoes?: string | null
          profundidade_aplicacao_cm?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "recomendacoes_adubacao_ciclo_id_fkey"
            columns: ["ciclo_id"]
            isOneToOne: false
            referencedRelation: "ciclos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recomendacoes_adubacao_criado_por_perfil_id_fkey"
            columns: ["criado_por_perfil_id"]
            isOneToOne: false
            referencedRelation: "perfis"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recomendacoes_adubacao_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recomendacoes_adubacao_maquina_id_fkey"
            columns: ["maquina_id"]
            isOneToOne: false
            referencedRelation: "maquinas"
            referencedColumns: ["id"]
          },
        ]
      }
      recomendacoes_adubacao_produtos: {
        Row: {
          dose_kg_ha: number
          id: string
          insumo_id: string
          recomendacao_id: string
        }
        Insert: {
          dose_kg_ha: number
          id?: string
          insumo_id: string
          recomendacao_id: string
        }
        Update: {
          dose_kg_ha?: number
          id?: string
          insumo_id?: string
          recomendacao_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recomendacoes_adubacao_produtos_insumo_id_fkey"
            columns: ["insumo_id"]
            isOneToOne: false
            referencedRelation: "insumos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recomendacoes_adubacao_produtos_recomendacao_id_fkey"
            columns: ["recomendacao_id"]
            isOneToOne: false
            referencedRelation: "recomendacoes_adubacao"
            referencedColumns: ["id"]
          },
        ]
      }
      recomendacoes_adubacao_talhoes: {
        Row: {
          area_ha: number
          id: string
          recomendacao_id: string
          talhao_id: string
        }
        Insert: {
          area_ha: number
          id?: string
          recomendacao_id: string
          talhao_id: string
        }
        Update: {
          area_ha?: number
          id?: string
          recomendacao_id?: string
          talhao_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recomendacoes_adubacao_talhoes_recomendacao_id_fkey"
            columns: ["recomendacao_id"]
            isOneToOne: false
            referencedRelation: "recomendacoes_adubacao"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recomendacoes_adubacao_talhoes_talhao_id_fkey"
            columns: ["talhao_id"]
            isOneToOne: false
            referencedRelation: "talhoes"
            referencedColumns: ["id"]
          },
        ]
      }
      recomendacoes_corretivo: {
        Row: {
          ciclo_id: string
          criado_em: string
          criado_por_perfil_id: string
          data_aplicacao_indicada: string
          data_aplicacao_realizada: string | null
          data_recomendacao: string
          fazenda_id: string
          finalidade: string
          hectares_realizados: number | null
          hectares_sugeridos: number
          id: string
          maquina_id: string | null
          observacoes: string | null
          profundidade_incorporacao_cm: number | null
        }
        Insert: {
          ciclo_id: string
          criado_em?: string
          criado_por_perfil_id: string
          data_aplicacao_indicada: string
          data_aplicacao_realizada?: string | null
          data_recomendacao?: string
          fazenda_id: string
          finalidade?: string
          hectares_realizados?: number | null
          hectares_sugeridos: number
          id?: string
          maquina_id?: string | null
          observacoes?: string | null
          profundidade_incorporacao_cm?: number | null
        }
        Update: {
          ciclo_id?: string
          criado_em?: string
          criado_por_perfil_id?: string
          data_aplicacao_indicada?: string
          data_aplicacao_realizada?: string | null
          data_recomendacao?: string
          fazenda_id?: string
          finalidade?: string
          hectares_realizados?: number | null
          hectares_sugeridos?: number
          id?: string
          maquina_id?: string | null
          observacoes?: string | null
          profundidade_incorporacao_cm?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "recomendacoes_corretivo_ciclo_id_fkey"
            columns: ["ciclo_id"]
            isOneToOne: false
            referencedRelation: "ciclos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recomendacoes_corretivo_criado_por_perfil_id_fkey"
            columns: ["criado_por_perfil_id"]
            isOneToOne: false
            referencedRelation: "perfis"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recomendacoes_corretivo_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recomendacoes_corretivo_maquina_id_fkey"
            columns: ["maquina_id"]
            isOneToOne: false
            referencedRelation: "maquinas"
            referencedColumns: ["id"]
          },
        ]
      }
      recomendacoes_corretivo_produtos: {
        Row: {
          dose_ton_ha: number
          id: string
          insumo_id: string
          prnt_pct: number | null
          recomendacao_id: string
        }
        Insert: {
          dose_ton_ha: number
          id?: string
          insumo_id: string
          prnt_pct?: number | null
          recomendacao_id: string
        }
        Update: {
          dose_ton_ha?: number
          id?: string
          insumo_id?: string
          prnt_pct?: number | null
          recomendacao_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recomendacoes_corretivo_produtos_insumo_id_fkey"
            columns: ["insumo_id"]
            isOneToOne: false
            referencedRelation: "insumos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recomendacoes_corretivo_produtos_recomendacao_id_fkey"
            columns: ["recomendacao_id"]
            isOneToOne: false
            referencedRelation: "recomendacoes_corretivo"
            referencedColumns: ["id"]
          },
        ]
      }
      recomendacoes_corretivo_talhoes: {
        Row: {
          area_ha: number
          id: string
          recomendacao_id: string
          talhao_id: string
        }
        Insert: {
          area_ha: number
          id?: string
          recomendacao_id: string
          talhao_id: string
        }
        Update: {
          area_ha?: number
          id?: string
          recomendacao_id?: string
          talhao_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recomendacoes_corretivo_talhoes_recomendacao_id_fkey"
            columns: ["recomendacao_id"]
            isOneToOne: false
            referencedRelation: "recomendacoes_corretivo"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recomendacoes_corretivo_talhoes_talhao_id_fkey"
            columns: ["talhao_id"]
            isOneToOne: false
            referencedRelation: "talhoes"
            referencedColumns: ["id"]
          },
        ]
      }
      recomendacoes_plantio: {
        Row: {
          ciclo_id: string
          criado_em: string
          criado_por_perfil_id: string
          data_aplicacao_indicada: string
          data_aplicacao_realizada: string | null
          data_colheita_prevista: string | null
          data_recomendacao: string
          espacamento_entrelinhas_cm: number | null
          fazenda_id: string
          hectares_realizados: number | null
          hectares_sugeridos: number
          id: string
          maquina_id: string | null
          observacoes: string | null
          populacao_plantas_ha: number | null
          profundidade_semeadura_cm: number | null
          velocidade_plantio_kmh: number | null
        }
        Insert: {
          ciclo_id: string
          criado_em?: string
          criado_por_perfil_id: string
          data_aplicacao_indicada: string
          data_aplicacao_realizada?: string | null
          data_colheita_prevista?: string | null
          data_recomendacao?: string
          espacamento_entrelinhas_cm?: number | null
          fazenda_id: string
          hectares_realizados?: number | null
          hectares_sugeridos: number
          id?: string
          maquina_id?: string | null
          observacoes?: string | null
          populacao_plantas_ha?: number | null
          profundidade_semeadura_cm?: number | null
          velocidade_plantio_kmh?: number | null
        }
        Update: {
          ciclo_id?: string
          criado_em?: string
          criado_por_perfil_id?: string
          data_aplicacao_indicada?: string
          data_aplicacao_realizada?: string | null
          data_colheita_prevista?: string | null
          data_recomendacao?: string
          espacamento_entrelinhas_cm?: number | null
          fazenda_id?: string
          hectares_realizados?: number | null
          hectares_sugeridos?: number
          id?: string
          maquina_id?: string | null
          observacoes?: string | null
          populacao_plantas_ha?: number | null
          profundidade_semeadura_cm?: number | null
          velocidade_plantio_kmh?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "recomendacoes_plantio_ciclo_id_fkey"
            columns: ["ciclo_id"]
            isOneToOne: false
            referencedRelation: "ciclos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recomendacoes_plantio_criado_por_perfil_id_fkey"
            columns: ["criado_por_perfil_id"]
            isOneToOne: false
            referencedRelation: "perfis"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recomendacoes_plantio_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recomendacoes_plantio_maquina_id_fkey"
            columns: ["maquina_id"]
            isOneToOne: false
            referencedRelation: "maquinas"
            referencedColumns: ["id"]
          },
        ]
      }
      recomendacoes_plantio_produtos: {
        Row: {
          dose_por_ha: number
          id: string
          insumo_id: string
          lote: string | null
          recomendacao_id: string
          unidade_dose: string
        }
        Insert: {
          dose_por_ha: number
          id?: string
          insumo_id: string
          lote?: string | null
          recomendacao_id: string
          unidade_dose: string
        }
        Update: {
          dose_por_ha?: number
          id?: string
          insumo_id?: string
          lote?: string | null
          recomendacao_id?: string
          unidade_dose?: string
        }
        Relationships: [
          {
            foreignKeyName: "recomendacoes_plantio_produtos_insumo_id_fkey"
            columns: ["insumo_id"]
            isOneToOne: false
            referencedRelation: "insumos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recomendacoes_plantio_produtos_recomendacao_id_fkey"
            columns: ["recomendacao_id"]
            isOneToOne: false
            referencedRelation: "recomendacoes_plantio"
            referencedColumns: ["id"]
          },
        ]
      }
      recomendacoes_plantio_talhoes: {
        Row: {
          area_ha: number
          id: string
          recomendacao_id: string
          talhao_id: string
        }
        Insert: {
          area_ha: number
          id?: string
          recomendacao_id: string
          talhao_id: string
        }
        Update: {
          area_ha?: number
          id?: string
          recomendacao_id?: string
          talhao_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recomendacoes_plantio_talhoes_recomendacao_id_fkey"
            columns: ["recomendacao_id"]
            isOneToOne: false
            referencedRelation: "recomendacoes_plantio"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recomendacoes_plantio_talhoes_talhao_id_fkey"
            columns: ["talhao_id"]
            isOneToOne: false
            referencedRelation: "talhoes"
            referencedColumns: ["id"]
          },
        ]
      }
      recomendacoes_pulverizacao: {
        Row: {
          ciclo_id: string
          classificacao_gota: string
          criado_em: string
          criado_por_perfil_id: string
          data_aplicacao_indicada: string
          data_aplicacao_realizada: string | null
          data_recomendacao: string
          fazenda_id: string
          hectares_realizados: number | null
          hectares_sugeridos: number
          id: string
          maquina_id: string | null
          observacoes: string | null
          pressao_bar: number
          temperatura_max_c: number | null
          temperatura_min_c: number | null
          tipo_bico: string
          umidade_relativa_min_pct: number | null
          vento_max_kmh: number | null
          vento_min_kmh: number | null
          volume_calda_l_ha: number
        }
        Insert: {
          ciclo_id: string
          classificacao_gota: string
          criado_em?: string
          criado_por_perfil_id: string
          data_aplicacao_indicada: string
          data_aplicacao_realizada?: string | null
          data_recomendacao?: string
          fazenda_id: string
          hectares_realizados?: number | null
          hectares_sugeridos: number
          id?: string
          maquina_id?: string | null
          observacoes?: string | null
          pressao_bar: number
          temperatura_max_c?: number | null
          temperatura_min_c?: number | null
          tipo_bico: string
          umidade_relativa_min_pct?: number | null
          vento_max_kmh?: number | null
          vento_min_kmh?: number | null
          volume_calda_l_ha: number
        }
        Update: {
          ciclo_id?: string
          classificacao_gota?: string
          criado_em?: string
          criado_por_perfil_id?: string
          data_aplicacao_indicada?: string
          data_aplicacao_realizada?: string | null
          data_recomendacao?: string
          fazenda_id?: string
          hectares_realizados?: number | null
          hectares_sugeridos?: number
          id?: string
          maquina_id?: string | null
          observacoes?: string | null
          pressao_bar?: number
          temperatura_max_c?: number | null
          temperatura_min_c?: number | null
          tipo_bico?: string
          umidade_relativa_min_pct?: number | null
          vento_max_kmh?: number | null
          vento_min_kmh?: number | null
          volume_calda_l_ha?: number
        }
        Relationships: [
          {
            foreignKeyName: "recomendacoes_pulverizacao_ciclo_id_fkey"
            columns: ["ciclo_id"]
            isOneToOne: false
            referencedRelation: "ciclos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recomendacoes_pulverizacao_criado_por_perfil_id_fkey"
            columns: ["criado_por_perfil_id"]
            isOneToOne: false
            referencedRelation: "perfis"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recomendacoes_pulverizacao_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recomendacoes_pulverizacao_maquina_id_fkey"
            columns: ["maquina_id"]
            isOneToOne: false
            referencedRelation: "maquinas"
            referencedColumns: ["id"]
          },
        ]
      }
      recomendacoes_pulverizacao_produtos: {
        Row: {
          dose_por_ha: number
          id: string
          insumo_id: string
          ordem_mistura: number | null
          recomendacao_id: string
          unidade_dose: string
        }
        Insert: {
          dose_por_ha: number
          id?: string
          insumo_id: string
          ordem_mistura?: number | null
          recomendacao_id: string
          unidade_dose: string
        }
        Update: {
          dose_por_ha?: number
          id?: string
          insumo_id?: string
          ordem_mistura?: number | null
          recomendacao_id?: string
          unidade_dose?: string
        }
        Relationships: [
          {
            foreignKeyName: "recomendacoes_pulverizacao_produtos_insumo_id_fkey"
            columns: ["insumo_id"]
            isOneToOne: false
            referencedRelation: "insumos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recomendacoes_pulverizacao_produtos_recomendacao_id_fkey"
            columns: ["recomendacao_id"]
            isOneToOne: false
            referencedRelation: "recomendacoes_pulverizacao"
            referencedColumns: ["id"]
          },
        ]
      }
      recomendacoes_pulverizacao_talhoes: {
        Row: {
          area_ha: number
          id: string
          recomendacao_id: string
          talhao_id: string
        }
        Insert: {
          area_ha: number
          id?: string
          recomendacao_id: string
          talhao_id: string
        }
        Update: {
          area_ha?: number
          id?: string
          recomendacao_id?: string
          talhao_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recomendacoes_pulverizacao_talhoes_recomendacao_id_fkey"
            columns: ["recomendacao_id"]
            isOneToOne: false
            referencedRelation: "recomendacoes_pulverizacao"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recomendacoes_pulverizacao_talhoes_talhao_id_fkey"
            columns: ["talhao_id"]
            isOneToOne: false
            referencedRelation: "talhoes"
            referencedColumns: ["id"]
          },
        ]
      }
      recomendacoes_tecnicas: {
        Row: {
          ciclo_id: string | null
          created_at: string | null
          data_recomendacao: string | null
          descricao: string | null
          estadio_fenologico: string | null
          fazenda_id: string
          id: string
          prioridade: string
          responsavel_tecnico: string | null
          status: string
          tipo: string
          titulo: string
        }
        Insert: {
          ciclo_id?: string | null
          created_at?: string | null
          data_recomendacao?: string | null
          descricao?: string | null
          estadio_fenologico?: string | null
          fazenda_id: string
          id?: string
          prioridade?: string
          responsavel_tecnico?: string | null
          status?: string
          tipo?: string
          titulo: string
        }
        Update: {
          ciclo_id?: string | null
          created_at?: string | null
          data_recomendacao?: string | null
          descricao?: string | null
          estadio_fenologico?: string | null
          fazenda_id?: string
          id?: string
          prioridade?: string
          responsavel_tecnico?: string | null
          status?: string
          tipo?: string
          titulo?: string
        }
        Relationships: [
          {
            foreignKeyName: "recomendacoes_tecnicas_ciclo_id_fkey"
            columns: ["ciclo_id"]
            isOneToOne: false
            referencedRelation: "safras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recomendacoes_tecnicas_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      regras_classificacao_nf: {
        Row: {
          ativo: boolean
          categoria: string | null
          centro_custo_id: string | null
          cnpj_emitente: string | null
          created_at: string | null
          criada_por: string | null
          descricao_contem: string | null
          fazenda_id: string
          id: string
          insumo_id: string | null
          ncm: string | null
          nome_regra: string | null
          operacao_gerencial_id: string | null
          qtd_aplicacoes: number
          tipo_nf: string
          ultima_aplicacao: string | null
        }
        Insert: {
          ativo?: boolean
          categoria?: string | null
          centro_custo_id?: string | null
          cnpj_emitente?: string | null
          created_at?: string | null
          criada_por?: string | null
          descricao_contem?: string | null
          fazenda_id: string
          id?: string
          insumo_id?: string | null
          ncm?: string | null
          nome_regra?: string | null
          operacao_gerencial_id?: string | null
          qtd_aplicacoes?: number
          tipo_nf?: string
          ultima_aplicacao?: string | null
        }
        Update: {
          ativo?: boolean
          categoria?: string | null
          centro_custo_id?: string | null
          cnpj_emitente?: string | null
          created_at?: string | null
          criada_por?: string | null
          descricao_contem?: string | null
          fazenda_id?: string
          id?: string
          insumo_id?: string | null
          ncm?: string | null
          nome_regra?: string | null
          operacao_gerencial_id?: string | null
          qtd_aplicacoes?: number
          tipo_nf?: string
          ultima_aplicacao?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "regras_classificacao_nf_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "regras_classificacao_nf_insumo_id_fkey"
            columns: ["insumo_id"]
            isOneToOne: false
            referencedRelation: "insumos"
            referencedColumns: ["id"]
          },
        ]
      }
      regras_rateio: {
        Row: {
          ano_safra_id: string | null
          ativo: boolean | null
          centro_custo_id: string | null
          centros_custo_ids: Json | null
          ciclo_a_descricao: string | null
          ciclo_a_id: string | null
          ciclo_a_pct: number | null
          ciclo_b_descricao: string | null
          ciclo_b_id: string | null
          ciclo_b_pct: number | null
          created_at: string | null
          descricao: string | null
          fazenda_id: string
          id: string
          nome: string
          tipo: string | null
          tipos: string[] | null
        }
        Insert: {
          ano_safra_id?: string | null
          ativo?: boolean | null
          centro_custo_id?: string | null
          centros_custo_ids?: Json | null
          ciclo_a_descricao?: string | null
          ciclo_a_id?: string | null
          ciclo_a_pct?: number | null
          ciclo_b_descricao?: string | null
          ciclo_b_id?: string | null
          ciclo_b_pct?: number | null
          created_at?: string | null
          descricao?: string | null
          fazenda_id: string
          id?: string
          nome: string
          tipo?: string | null
          tipos?: string[] | null
        }
        Update: {
          ano_safra_id?: string | null
          ativo?: boolean | null
          centro_custo_id?: string | null
          centros_custo_ids?: Json | null
          ciclo_a_descricao?: string | null
          ciclo_a_id?: string | null
          ciclo_a_pct?: number | null
          ciclo_b_descricao?: string | null
          ciclo_b_id?: string | null
          ciclo_b_pct?: number | null
          created_at?: string | null
          descricao?: string | null
          fazenda_id?: string
          id?: string
          nome?: string
          tipo?: string | null
          tipos?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "regras_rateio_ano_safra_id_fkey"
            columns: ["ano_safra_id"]
            isOneToOne: false
            referencedRelation: "anos_safra"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "regras_rateio_centro_custo_id_fkey"
            columns: ["centro_custo_id"]
            isOneToOne: false
            referencedRelation: "centros_custo"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "regras_rateio_ciclo_a_id_fkey"
            columns: ["ciclo_a_id"]
            isOneToOne: false
            referencedRelation: "ciclos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "regras_rateio_ciclo_b_id_fkey"
            columns: ["ciclo_b_id"]
            isOneToOne: false
            referencedRelation: "ciclos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "regras_rateio_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      regras_rateio_global: {
        Row: {
          ano_safra_id: string | null
          ano_safra_label: string
          ativo: boolean | null
          centro_custo_id: string | null
          conta_id: string
          created_at: string | null
          descricao: string | null
          id: string
          nome: string
          tipo: string | null
        }
        Insert: {
          ano_safra_id?: string | null
          ano_safra_label: string
          ativo?: boolean | null
          centro_custo_id?: string | null
          conta_id: string
          created_at?: string | null
          descricao?: string | null
          id?: string
          nome: string
          tipo?: string | null
        }
        Update: {
          ano_safra_id?: string | null
          ano_safra_label?: string
          ativo?: boolean | null
          centro_custo_id?: string | null
          conta_id?: string
          created_at?: string | null
          descricao?: string | null
          id?: string
          nome?: string
          tipo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "regras_rateio_global_ano_safra_id_fkey"
            columns: ["ano_safra_id"]
            isOneToOne: false
            referencedRelation: "anos_safra"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "regras_rateio_global_centro_custo_id_fkey"
            columns: ["centro_custo_id"]
            isOneToOne: false
            referencedRelation: "centros_custo"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "regras_rateio_global_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "contas"
            referencedColumns: ["id"]
          },
        ]
      }
      romaneios: {
        Row: {
          ardidos_pct: number | null
          avariados_padrao_pct: number | null
          avariados_pct: number | null
          carunchados_pct: number | null
          ciclo_id: string | null
          contrato_id: string
          created_at: string | null
          data: string
          deposito_id: string | null
          desconto_avariados_kg: number | null
          desconto_impureza_kg: number | null
          desconto_umidade_kg: number | null
          diferenca_kg: number | null
          diferenca_pct: number | null
          esverdeados_pct: number | null
          fazenda_id: string
          fermentados_pct: number | null
          germinados_pct: number | null
          id: string
          impureza_padrao_pct: number | null
          impureza_pct: number | null
          insumo_id: string | null
          mofados_pct: number | null
          motorista_id: string | null
          motorista_nome: string | null
          nfe_chave: string | null
          nfe_numero: string | null
          nfe_status: string | null
          numero: string
          obs_divergencia: string | null
          outros_avariados_pct: number | null
          padrao_classificacao_id: string | null
          peso_bruto_kg: number
          peso_class_destino: number | null
          peso_classificado_kg: number | null
          peso_liquido_destino: number | null
          peso_liquido_kg: number | null
          ph_hl: number | null
          placa: string
          produtor_id: string | null
          quebrados_pct: number | null
          sacas: number | null
          sacas_faturadas: number | null
          tara_kg: number
          transportadora_id: string | null
          umidade_padrao_pct: number | null
          umidade_pct: number | null
          veiculo_id: string | null
        }
        Insert: {
          ardidos_pct?: number | null
          avariados_padrao_pct?: number | null
          avariados_pct?: number | null
          carunchados_pct?: number | null
          ciclo_id?: string | null
          contrato_id: string
          created_at?: string | null
          data: string
          deposito_id?: string | null
          desconto_avariados_kg?: number | null
          desconto_impureza_kg?: number | null
          desconto_umidade_kg?: number | null
          diferenca_kg?: number | null
          diferenca_pct?: number | null
          esverdeados_pct?: number | null
          fazenda_id: string
          fermentados_pct?: number | null
          germinados_pct?: number | null
          id?: string
          impureza_padrao_pct?: number | null
          impureza_pct?: number | null
          insumo_id?: string | null
          mofados_pct?: number | null
          motorista_id?: string | null
          motorista_nome?: string | null
          nfe_chave?: string | null
          nfe_numero?: string | null
          nfe_status?: string | null
          numero: string
          obs_divergencia?: string | null
          outros_avariados_pct?: number | null
          padrao_classificacao_id?: string | null
          peso_bruto_kg: number
          peso_class_destino?: number | null
          peso_classificado_kg?: number | null
          peso_liquido_destino?: number | null
          peso_liquido_kg?: number | null
          ph_hl?: number | null
          placa: string
          produtor_id?: string | null
          quebrados_pct?: number | null
          sacas?: number | null
          sacas_faturadas?: number | null
          tara_kg: number
          transportadora_id?: string | null
          umidade_padrao_pct?: number | null
          umidade_pct?: number | null
          veiculo_id?: string | null
        }
        Update: {
          ardidos_pct?: number | null
          avariados_padrao_pct?: number | null
          avariados_pct?: number | null
          carunchados_pct?: number | null
          ciclo_id?: string | null
          contrato_id?: string
          created_at?: string | null
          data?: string
          deposito_id?: string | null
          desconto_avariados_kg?: number | null
          desconto_impureza_kg?: number | null
          desconto_umidade_kg?: number | null
          diferenca_kg?: number | null
          diferenca_pct?: number | null
          esverdeados_pct?: number | null
          fazenda_id?: string
          fermentados_pct?: number | null
          germinados_pct?: number | null
          id?: string
          impureza_padrao_pct?: number | null
          impureza_pct?: number | null
          insumo_id?: string | null
          mofados_pct?: number | null
          motorista_id?: string | null
          motorista_nome?: string | null
          nfe_chave?: string | null
          nfe_numero?: string | null
          nfe_status?: string | null
          numero?: string
          obs_divergencia?: string | null
          outros_avariados_pct?: number | null
          padrao_classificacao_id?: string | null
          peso_bruto_kg?: number
          peso_class_destino?: number | null
          peso_classificado_kg?: number | null
          peso_liquido_destino?: number | null
          peso_liquido_kg?: number | null
          ph_hl?: number | null
          placa?: string
          produtor_id?: string | null
          quebrados_pct?: number | null
          sacas?: number | null
          sacas_faturadas?: number | null
          tara_kg?: number
          transportadora_id?: string | null
          umidade_padrao_pct?: number | null
          umidade_pct?: number | null
          veiculo_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "romaneios_ciclo_id_fkey"
            columns: ["ciclo_id"]
            isOneToOne: false
            referencedRelation: "ciclos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "romaneios_contrato_id_fkey"
            columns: ["contrato_id"]
            isOneToOne: false
            referencedRelation: "contratos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "romaneios_deposito_id_fkey"
            columns: ["deposito_id"]
            isOneToOne: false
            referencedRelation: "depositos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "romaneios_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "romaneios_insumo_id_fkey"
            columns: ["insumo_id"]
            isOneToOne: false
            referencedRelation: "insumos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "romaneios_motorista_id_fkey"
            columns: ["motorista_id"]
            isOneToOne: false
            referencedRelation: "motoristas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "romaneios_padrao_classificacao_id_fkey"
            columns: ["padrao_classificacao_id"]
            isOneToOne: false
            referencedRelation: "padroes_classificacao"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "romaneios_produtor_id_fkey"
            columns: ["produtor_id"]
            isOneToOne: false
            referencedRelation: "produtores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "romaneios_transportadora_id_fkey"
            columns: ["transportadora_id"]
            isOneToOne: false
            referencedRelation: "transportadoras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "romaneios_veiculo_id_fkey"
            columns: ["veiculo_id"]
            isOneToOne: false
            referencedRelation: "veiculos"
            referencedColumns: ["id"]
          },
        ]
      }
      romaneios_entrada: {
        Row: {
          aprovado_em: string | null
          aprovado_por_perfil_id: string | null
          ardidos_pct: number | null
          avariados_padrao_pct: number | null
          avariados_pct: number | null
          carunchados_pct: number | null
          ciclo_id: string | null
          colheita_id: string | null
          contrato_id: string | null
          created_at: string | null
          data: string
          deposito_id: string | null
          desconto_avariados_kg: number | null
          desconto_impureza_kg: number | null
          desconto_umidade_kg: number | null
          emitido_por: string | null
          entrada_estoque: boolean | null
          esverdeados_pct: number | null
          fazenda_id: string
          fermentados_pct: number | null
          germinados_pct: number | null
          id: string
          ie_municipio: string | null
          ie_produtor: string | null
          impureza_padrao_pct: number | null
          impureza_pct: number | null
          insumo_id: string | null
          lancado_por_perfil_id: string | null
          modo_pesagem: string | null
          mofados_pct: number | null
          motivo_rejeicao: string | null
          motorista: string | null
          obs: string | null
          origem_lancamento: string
          outros_avariados_pct: number | null
          peso_bruto_kg: number
          peso_classificado_kg: number | null
          peso_liquido_kg: number | null
          pessoa_id: string | null
          ph_hl: number | null
          placa: string | null
          produto_nome: string | null
          produtor_id: string | null
          quebrados_pct: number | null
          sacas: number | null
          status: string
          status_campo: string
          talhao_id: string | null
          tara_kg: number
          ticket_numero: string | null
          ticket_terceiro: string | null
          tipo: string
          umidade_padrao_pct: number | null
          umidade_pct: number | null
        }
        Insert: {
          aprovado_em?: string | null
          aprovado_por_perfil_id?: string | null
          ardidos_pct?: number | null
          avariados_padrao_pct?: number | null
          avariados_pct?: number | null
          carunchados_pct?: number | null
          ciclo_id?: string | null
          colheita_id?: string | null
          contrato_id?: string | null
          created_at?: string | null
          data?: string
          deposito_id?: string | null
          desconto_avariados_kg?: number | null
          desconto_impureza_kg?: number | null
          desconto_umidade_kg?: number | null
          emitido_por?: string | null
          entrada_estoque?: boolean | null
          esverdeados_pct?: number | null
          fazenda_id: string
          fermentados_pct?: number | null
          germinados_pct?: number | null
          id?: string
          ie_municipio?: string | null
          ie_produtor?: string | null
          impureza_padrao_pct?: number | null
          impureza_pct?: number | null
          insumo_id?: string | null
          lancado_por_perfil_id?: string | null
          modo_pesagem?: string | null
          mofados_pct?: number | null
          motivo_rejeicao?: string | null
          motorista?: string | null
          obs?: string | null
          origem_lancamento?: string
          outros_avariados_pct?: number | null
          peso_bruto_kg?: number
          peso_classificado_kg?: number | null
          peso_liquido_kg?: number | null
          pessoa_id?: string | null
          ph_hl?: number | null
          placa?: string | null
          produto_nome?: string | null
          produtor_id?: string | null
          quebrados_pct?: number | null
          sacas?: number | null
          status?: string
          status_campo?: string
          talhao_id?: string | null
          tara_kg?: number
          ticket_numero?: string | null
          ticket_terceiro?: string | null
          tipo?: string
          umidade_padrao_pct?: number | null
          umidade_pct?: number | null
        }
        Update: {
          aprovado_em?: string | null
          aprovado_por_perfil_id?: string | null
          ardidos_pct?: number | null
          avariados_padrao_pct?: number | null
          avariados_pct?: number | null
          carunchados_pct?: number | null
          ciclo_id?: string | null
          colheita_id?: string | null
          contrato_id?: string | null
          created_at?: string | null
          data?: string
          deposito_id?: string | null
          desconto_avariados_kg?: number | null
          desconto_impureza_kg?: number | null
          desconto_umidade_kg?: number | null
          emitido_por?: string | null
          entrada_estoque?: boolean | null
          esverdeados_pct?: number | null
          fazenda_id?: string
          fermentados_pct?: number | null
          germinados_pct?: number | null
          id?: string
          ie_municipio?: string | null
          ie_produtor?: string | null
          impureza_padrao_pct?: number | null
          impureza_pct?: number | null
          insumo_id?: string | null
          lancado_por_perfil_id?: string | null
          modo_pesagem?: string | null
          mofados_pct?: number | null
          motivo_rejeicao?: string | null
          motorista?: string | null
          obs?: string | null
          origem_lancamento?: string
          outros_avariados_pct?: number | null
          peso_bruto_kg?: number
          peso_classificado_kg?: number | null
          peso_liquido_kg?: number | null
          pessoa_id?: string | null
          ph_hl?: number | null
          placa?: string | null
          produto_nome?: string | null
          produtor_id?: string | null
          quebrados_pct?: number | null
          sacas?: number | null
          status?: string
          status_campo?: string
          talhao_id?: string | null
          tara_kg?: number
          ticket_numero?: string | null
          ticket_terceiro?: string | null
          tipo?: string
          umidade_padrao_pct?: number | null
          umidade_pct?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "romaneios_entrada_aprovado_por_perfil_id_fkey"
            columns: ["aprovado_por_perfil_id"]
            isOneToOne: false
            referencedRelation: "perfis"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "romaneios_entrada_ciclo_id_fkey"
            columns: ["ciclo_id"]
            isOneToOne: false
            referencedRelation: "ciclos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "romaneios_entrada_colheita_id_fkey"
            columns: ["colheita_id"]
            isOneToOne: false
            referencedRelation: "colheitas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "romaneios_entrada_contrato_id_fkey"
            columns: ["contrato_id"]
            isOneToOne: false
            referencedRelation: "contratos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "romaneios_entrada_deposito_id_fkey"
            columns: ["deposito_id"]
            isOneToOne: false
            referencedRelation: "depositos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "romaneios_entrada_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "romaneios_entrada_insumo_id_fkey"
            columns: ["insumo_id"]
            isOneToOne: false
            referencedRelation: "insumos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "romaneios_entrada_lancado_por_perfil_id_fkey"
            columns: ["lancado_por_perfil_id"]
            isOneToOne: false
            referencedRelation: "perfis"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "romaneios_entrada_pessoa_id_fkey"
            columns: ["pessoa_id"]
            isOneToOne: false
            referencedRelation: "pessoas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "romaneios_entrada_produtor_id_fkey"
            columns: ["produtor_id"]
            isOneToOne: false
            referencedRelation: "produtores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "romaneios_entrada_talhao_id_fkey"
            columns: ["talhao_id"]
            isOneToOne: false
            referencedRelation: "talhoes"
            referencedColumns: ["id"]
          },
        ]
      }
      safras: {
        Row: {
          ano_agricola: string
          ano_safra_id: string | null
          area_ha: number
          ciclo_id: string | null
          created_at: string | null
          cultura: string
          data_colheita: string | null
          data_plantio: string | null
          fazenda_id: string
          id: string
          produtividade_sc_ha: number | null
          status: string
          talhao_id: string | null
        }
        Insert: {
          ano_agricola: string
          ano_safra_id?: string | null
          area_ha: number
          ciclo_id?: string | null
          created_at?: string | null
          cultura: string
          data_colheita?: string | null
          data_plantio?: string | null
          fazenda_id: string
          id?: string
          produtividade_sc_ha?: number | null
          status?: string
          talhao_id?: string | null
        }
        Update: {
          ano_agricola?: string
          ano_safra_id?: string | null
          area_ha?: number
          ciclo_id?: string | null
          created_at?: string | null
          cultura?: string
          data_colheita?: string | null
          data_plantio?: string | null
          fazenda_id?: string
          id?: string
          produtividade_sc_ha?: number | null
          status?: string
          talhao_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "safras_ano_safra_id_fkey"
            columns: ["ano_safra_id"]
            isOneToOne: false
            referencedRelation: "anos_safra"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "safras_ciclo_id_fkey"
            columns: ["ciclo_id"]
            isOneToOne: false
            referencedRelation: "ciclos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "safras_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "safras_talhao_id_fkey"
            columns: ["talhao_id"]
            isOneToOne: false
            referencedRelation: "talhoes"
            referencedColumns: ["id"]
          },
        ]
      }
      sessoes_whatsapp: {
        Row: {
          aguardando_foto: boolean | null
          created_at: string | null
          dados: Json | null
          etapa: string | null
          fazenda_id: string | null
          fazenda_nome: string | null
          fluxo: string | null
          id: string
          telefone: string
          updated_at: string | null
          usuario_id: string | null
        }
        Insert: {
          aguardando_foto?: boolean | null
          created_at?: string | null
          dados?: Json | null
          etapa?: string | null
          fazenda_id?: string | null
          fazenda_nome?: string | null
          fluxo?: string | null
          id?: string
          telefone: string
          updated_at?: string | null
          usuario_id?: string | null
        }
        Update: {
          aguardando_foto?: boolean | null
          created_at?: string | null
          dados?: Json | null
          etapa?: string | null
          fazenda_id?: string | null
          fazenda_nome?: string | null
          fluxo?: string | null
          id?: string
          telefone?: string
          updated_at?: string | null
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sessoes_whatsapp_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      simulacoes: {
        Row: {
          ativa: boolean
          conta_id: string | null
          created_at: string | null
          data: string
          descricao: string
          fazenda_id: string | null
          fornecedor: string | null
          id: string
          tipo: string
          valor: number
        }
        Insert: {
          ativa?: boolean
          conta_id?: string | null
          created_at?: string | null
          data: string
          descricao: string
          fazenda_id?: string | null
          fornecedor?: string | null
          id?: string
          tipo: string
          valor: number
        }
        Update: {
          ativa?: boolean
          conta_id?: string | null
          created_at?: string | null
          data?: string
          descricao?: string
          fazenda_id?: string | null
          fornecedor?: string | null
          id?: string
          tipo?: string
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "simulacoes_conta_id_fkey"
            columns: ["conta_id"]
            isOneToOne: false
            referencedRelation: "contas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "simulacoes_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      sinistros_seguro: {
        Row: {
          apolice_id: string
          created_at: string | null
          data_comunicacao: string | null
          data_ocorrencia: string
          descricao: string
          id: string
          numero_protocolo: string | null
          observacao: string | null
          status: string
          valor_indenizado: number
          valor_reclamado: number
        }
        Insert: {
          apolice_id: string
          created_at?: string | null
          data_comunicacao?: string | null
          data_ocorrencia: string
          descricao: string
          id?: string
          numero_protocolo?: string | null
          observacao?: string | null
          status?: string
          valor_indenizado?: number
          valor_reclamado?: number
        }
        Update: {
          apolice_id?: string
          created_at?: string | null
          data_comunicacao?: string | null
          data_ocorrencia?: string
          descricao?: string
          id?: string
          numero_protocolo?: string | null
          observacao?: string | null
          status?: string
          valor_indenizado?: number
          valor_reclamado?: number
        }
        Relationships: [
          {
            foreignKeyName: "sinistros_seguro_apolice_id_fkey"
            columns: ["apolice_id"]
            isOneToOne: false
            referencedRelation: "apolices_seguro"
            referencedColumns: ["id"]
          },
        ]
      }
      solicitacoes_transferencia_maquinas: {
        Row: {
          created_at: string
          data_necessidade: string | null
          data_resposta: string | null
          data_solicitacao: string
          fazenda_destino_id: string
          fazenda_origem_id: string
          id: string
          maquina_id: string
          motivo: string | null
          numero: string
          observacao: string | null
          respondido_por: string | null
          solicitante_nome: string | null
          status: string
          urgencia: string
          via_app: boolean | null
        }
        Insert: {
          created_at?: string
          data_necessidade?: string | null
          data_resposta?: string | null
          data_solicitacao?: string
          fazenda_destino_id: string
          fazenda_origem_id: string
          id?: string
          maquina_id: string
          motivo?: string | null
          numero: string
          observacao?: string | null
          respondido_por?: string | null
          solicitante_nome?: string | null
          status?: string
          urgencia?: string
          via_app?: boolean | null
        }
        Update: {
          created_at?: string
          data_necessidade?: string | null
          data_resposta?: string | null
          data_solicitacao?: string
          fazenda_destino_id?: string
          fazenda_origem_id?: string
          id?: string
          maquina_id?: string
          motivo?: string | null
          numero?: string
          observacao?: string | null
          respondido_por?: string | null
          solicitante_nome?: string | null
          status?: string
          urgencia?: string
          via_app?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "solicitacoes_transferencia_maquinas_fazenda_destino_id_fkey"
            columns: ["fazenda_destino_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "solicitacoes_transferencia_maquinas_fazenda_origem_id_fkey"
            columns: ["fazenda_origem_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "solicitacoes_transferencia_maquinas_maquina_id_fkey"
            columns: ["maquina_id"]
            isOneToOne: false
            referencedRelation: "maquinas"
            referencedColumns: ["id"]
          },
        ]
      }
      subgrupos_insumo: {
        Row: {
          created_at: string | null
          fazenda_id: string
          grupo_id: string
          id: string
          nome: string
        }
        Insert: {
          created_at?: string | null
          fazenda_id: string
          grupo_id: string
          id?: string
          nome: string
        }
        Update: {
          created_at?: string | null
          fazenda_id?: string
          grupo_id?: string
          id?: string
          nome?: string
        }
        Relationships: [
          {
            foreignKeyName: "subgrupos_insumo_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subgrupos_insumo_grupo_id_fkey"
            columns: ["grupo_id"]
            isOneToOne: false
            referencedRelation: "grupos_insumo"
            referencedColumns: ["id"]
          },
        ]
      }
      subgrupos_insumos: {
        Row: {
          created_at: string | null
          fazenda_id: string | null
          grupo_id: string | null
          id: string
          nome: string
        }
        Insert: {
          created_at?: string | null
          fazenda_id?: string | null
          grupo_id?: string | null
          id?: string
          nome: string
        }
        Update: {
          created_at?: string | null
          fazenda_id?: string | null
          grupo_id?: string | null
          id?: string
          nome?: string
        }
        Relationships: [
          {
            foreignKeyName: "subgrupos_insumos_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subgrupos_insumos_grupo_id_fkey"
            columns: ["grupo_id"]
            isOneToOne: false
            referencedRelation: "grupos_insumos"
            referencedColumns: ["id"]
          },
        ]
      }
      suporte_conversas: {
        Row: {
          created_at: string | null
          fazenda_id: string
          id: string
          titulo: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          fazenda_id: string
          id?: string
          titulo?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          fazenda_id?: string
          id?: string
          titulo?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "suporte_conversas_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      suporte_mensagens: {
        Row: {
          content: string
          conversa_id: string
          created_at: string | null
          fazenda_id: string
          id: string
          role: string
        }
        Insert: {
          content: string
          conversa_id: string
          created_at?: string | null
          fazenda_id: string
          id?: string
          role: string
        }
        Update: {
          content?: string
          conversa_id?: string
          created_at?: string | null
          fazenda_id?: string
          id?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "suporte_mensagens_conversa_id_fkey"
            columns: ["conversa_id"]
            isOneToOne: false
            referencedRelation: "suporte_conversas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "suporte_mensagens_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      talhao_arrendamentos: {
        Row: {
          arrendamento_id: string
          created_at: string
          id: string
          talhao_id: string
        }
        Insert: {
          arrendamento_id: string
          created_at?: string
          id?: string
          talhao_id: string
        }
        Update: {
          arrendamento_id?: string
          created_at?: string
          id?: string
          talhao_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "talhao_arrendamentos_arrendamento_id_fkey"
            columns: ["arrendamento_id"]
            isOneToOne: false
            referencedRelation: "arrendamentos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "talhao_arrendamentos_talhao_id_fkey"
            columns: ["talhao_id"]
            isOneToOne: false
            referencedRelation: "talhoes"
            referencedColumns: ["id"]
          },
        ]
      }
      talhao_cars: {
        Row: {
          car_id: string
          created_at: string
          id: string
          talhao_id: string
        }
        Insert: {
          car_id: string
          created_at?: string
          id?: string
          talhao_id: string
        }
        Update: {
          car_id?: string
          created_at?: string
          id?: string
          talhao_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "talhao_cars_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "fazenda_cars"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "talhao_cars_talhao_id_fkey"
            columns: ["talhao_id"]
            isOneToOne: false
            referencedRelation: "talhoes"
            referencedColumns: ["id"]
          },
        ]
      }
      talhao_matriculas: {
        Row: {
          created_at: string
          id: string
          matricula_id: string
          talhao_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          matricula_id: string
          talhao_id: string
        }
        Update: {
          created_at?: string
          id?: string
          matricula_id?: string
          talhao_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "talhao_matriculas_matricula_id_fkey"
            columns: ["matricula_id"]
            isOneToOne: false
            referencedRelation: "matriculas_imoveis"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "talhao_matriculas_talhao_id_fkey"
            columns: ["talhao_id"]
            isOneToOne: false
            referencedRelation: "talhoes"
            referencedColumns: ["id"]
          },
        ]
      }
      talhoes: {
        Row: {
          area_ha: number
          area_plantada_ha: number | null
          arrendamento_id: string | null
          created_at: string | null
          fazenda_id: string
          id: string
          kml_url: string | null
          lat: number | null
          lng: number | null
          nome: string
          tipo_posse: string
          tipo_solo: string | null
        }
        Insert: {
          area_ha: number
          area_plantada_ha?: number | null
          arrendamento_id?: string | null
          created_at?: string | null
          fazenda_id: string
          id?: string
          kml_url?: string | null
          lat?: number | null
          lng?: number | null
          nome: string
          tipo_posse?: string
          tipo_solo?: string | null
        }
        Update: {
          area_ha?: number
          area_plantada_ha?: number | null
          arrendamento_id?: string | null
          created_at?: string | null
          fazenda_id?: string
          id?: string
          kml_url?: string | null
          lat?: number | null
          lng?: number | null
          nome?: string
          tipo_posse?: string
          tipo_solo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "talhoes_arrendamento_id_fkey"
            columns: ["arrendamento_id"]
            isOneToOne: false
            referencedRelation: "arrendamentos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "talhoes_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      tarefas: {
        Row: {
          concluida_em: string | null
          criado_em: string
          fazenda_id: string
          id: string
          perfil_atribuido_id: string
          recomendacao_adubacao_id: string | null
          recomendacao_corretivo_id: string | null
          recomendacao_plantio_id: string | null
          recomendacao_pulverizacao_id: string | null
          status: string
        }
        Insert: {
          concluida_em?: string | null
          criado_em?: string
          fazenda_id: string
          id?: string
          perfil_atribuido_id: string
          recomendacao_adubacao_id?: string | null
          recomendacao_corretivo_id?: string | null
          recomendacao_plantio_id?: string | null
          recomendacao_pulverizacao_id?: string | null
          status?: string
        }
        Update: {
          concluida_em?: string | null
          criado_em?: string
          fazenda_id?: string
          id?: string
          perfil_atribuido_id?: string
          recomendacao_adubacao_id?: string | null
          recomendacao_corretivo_id?: string | null
          recomendacao_plantio_id?: string | null
          recomendacao_pulverizacao_id?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "tarefas_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tarefas_perfil_atribuido_id_fkey"
            columns: ["perfil_atribuido_id"]
            isOneToOne: false
            referencedRelation: "perfis"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tarefas_recomendacao_adubacao_id_fkey"
            columns: ["recomendacao_adubacao_id"]
            isOneToOne: false
            referencedRelation: "recomendacoes_adubacao"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tarefas_recomendacao_corretivo_id_fkey"
            columns: ["recomendacao_corretivo_id"]
            isOneToOne: false
            referencedRelation: "recomendacoes_corretivo"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tarefas_recomendacao_plantio_id_fkey"
            columns: ["recomendacao_plantio_id"]
            isOneToOne: false
            referencedRelation: "recomendacoes_plantio"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tarefas_recomendacao_pulverizacao_id_fkey"
            columns: ["recomendacao_pulverizacao_id"]
            isOneToOne: false
            referencedRelation: "recomendacoes_pulverizacao"
            referencedColumns: ["id"]
          },
        ]
      }
      tarefas_transferencias: {
        Row: {
          autorizado_por_perfil_id: string
          id: string
          perfil_destino_id: string
          perfil_origem_id: string
          tarefa_id: string
          transferido_em: string
        }
        Insert: {
          autorizado_por_perfil_id: string
          id?: string
          perfil_destino_id: string
          perfil_origem_id: string
          tarefa_id: string
          transferido_em?: string
        }
        Update: {
          autorizado_por_perfil_id?: string
          id?: string
          perfil_destino_id?: string
          perfil_origem_id?: string
          tarefa_id?: string
          transferido_em?: string
        }
        Relationships: [
          {
            foreignKeyName: "tarefas_transferencias_autorizado_por_perfil_id_fkey"
            columns: ["autorizado_por_perfil_id"]
            isOneToOne: false
            referencedRelation: "perfis"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tarefas_transferencias_perfil_destino_id_fkey"
            columns: ["perfil_destino_id"]
            isOneToOne: false
            referencedRelation: "perfis"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tarefas_transferencias_perfil_origem_id_fkey"
            columns: ["perfil_origem_id"]
            isOneToOne: false
            referencedRelation: "perfis"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tarefas_transferencias_tarefa_id_fkey"
            columns: ["tarefa_id"]
            isOneToOne: false
            referencedRelation: "tarefas"
            referencedColumns: ["id"]
          },
        ]
      }
      taxas_bancarias: {
        Row: {
          competencia: string | null
          conta_bancaria_id: string | null
          conta_nome: string | null
          created_at: string | null
          data_lancamento: string
          descricao: string
          fazenda_id: string
          id: string
          observacao: string | null
          tipo: string
          valor: number
        }
        Insert: {
          competencia?: string | null
          conta_bancaria_id?: string | null
          conta_nome?: string | null
          created_at?: string | null
          data_lancamento: string
          descricao: string
          fazenda_id: string
          id?: string
          observacao?: string | null
          tipo?: string
          valor?: number
        }
        Update: {
          competencia?: string | null
          conta_bancaria_id?: string | null
          conta_nome?: string | null
          created_at?: string | null
          data_lancamento?: string
          descricao?: string
          fazenda_id?: string
          id?: string
          observacao?: string | null
          tipo?: string
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "taxas_bancarias_conta_bancaria_id_fkey"
            columns: ["conta_bancaria_id"]
            isOneToOne: false
            referencedRelation: "contas_bancarias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "taxas_bancarias_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      taxas_variaveis_historico: {
        Row: {
          ano: number
          created_at: string | null
          fonte: string | null
          id: string
          indexador: string
          mes: number
          updated_at: string | null
          valor_pct: number
        }
        Insert: {
          ano: number
          created_at?: string | null
          fonte?: string | null
          id?: string
          indexador: string
          mes: number
          updated_at?: string | null
          valor_pct: number
        }
        Update: {
          ano?: number
          created_at?: string | null
          fonte?: string | null
          id?: string
          indexador?: string
          mes?: number
          updated_at?: string | null
          valor_pct?: number
        }
        Relationships: []
      }
      textos_legais_uf: {
        Row: {
          atualizado_em: string | null
          cfop_tipo: string
          texto: string
          uf: string
        }
        Insert: {
          atualizado_em?: string | null
          cfop_tipo: string
          texto: string
          uf: string
        }
        Update: {
          atualizado_em?: string | null
          cfop_tipo?: string
          texto?: string
          uf?: string
        }
        Relationships: []
      }
      tipos_pessoa: {
        Row: {
          created_at: string | null
          descricao: string | null
          fazenda_id: string | null
          id: string
          nome: string
        }
        Insert: {
          created_at?: string | null
          descricao?: string | null
          fazenda_id?: string | null
          id?: string
          nome: string
        }
        Update: {
          created_at?: string | null
          descricao?: string | null
          fazenda_id?: string | null
          id?: string
          nome?: string
        }
        Relationships: [
          {
            foreignKeyName: "tipos_pessoa_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      transferencias_estoque: {
        Row: {
          cfop: string
          cpf_cnpj_destino: string | null
          cpf_cnpj_origem: string | null
          created_at: string | null
          created_by: string | null
          data_emissao: string | null
          data_transferencia: string
          deposito_destino_id: string | null
          deposito_origem_id: string | null
          entrada_automatica: boolean
          fazenda_destino_id: string
          fazenda_origem_id: string
          frete_conta: string | null
          id: string
          ie_destino: string | null
          ie_diferentes: boolean
          ie_origem: string | null
          motorista_id: string | null
          nf_chave: string | null
          nf_destino_chave: string | null
          nf_destino_numero: string | null
          nf_modulo_key: string | null
          nf_numero: string | null
          nf_protocolo: string | null
          numero: string | null
          observacao: string | null
          solicitante_nome: string | null
          status: string
          transportadora_id: string | null
          urgencia: string
          veiculo_id: string | null
          via_app: boolean
        }
        Insert: {
          cfop?: string
          cpf_cnpj_destino?: string | null
          cpf_cnpj_origem?: string | null
          created_at?: string | null
          created_by?: string | null
          data_emissao?: string | null
          data_transferencia?: string
          deposito_destino_id?: string | null
          deposito_origem_id?: string | null
          entrada_automatica?: boolean
          fazenda_destino_id: string
          fazenda_origem_id: string
          frete_conta?: string | null
          id?: string
          ie_destino?: string | null
          ie_diferentes?: boolean
          ie_origem?: string | null
          motorista_id?: string | null
          nf_chave?: string | null
          nf_destino_chave?: string | null
          nf_destino_numero?: string | null
          nf_modulo_key?: string | null
          nf_numero?: string | null
          nf_protocolo?: string | null
          numero?: string | null
          observacao?: string | null
          solicitante_nome?: string | null
          status?: string
          transportadora_id?: string | null
          urgencia?: string
          veiculo_id?: string | null
          via_app?: boolean
        }
        Update: {
          cfop?: string
          cpf_cnpj_destino?: string | null
          cpf_cnpj_origem?: string | null
          created_at?: string | null
          created_by?: string | null
          data_emissao?: string | null
          data_transferencia?: string
          deposito_destino_id?: string | null
          deposito_origem_id?: string | null
          entrada_automatica?: boolean
          fazenda_destino_id?: string
          fazenda_origem_id?: string
          frete_conta?: string | null
          id?: string
          ie_destino?: string | null
          ie_diferentes?: boolean
          ie_origem?: string | null
          motorista_id?: string | null
          nf_chave?: string | null
          nf_destino_chave?: string | null
          nf_destino_numero?: string | null
          nf_modulo_key?: string | null
          nf_numero?: string | null
          nf_protocolo?: string | null
          numero?: string | null
          observacao?: string | null
          solicitante_nome?: string | null
          status?: string
          transportadora_id?: string | null
          urgencia?: string
          veiculo_id?: string | null
          via_app?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "transferencias_estoque_deposito_destino_id_fkey"
            columns: ["deposito_destino_id"]
            isOneToOne: false
            referencedRelation: "depositos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transferencias_estoque_deposito_origem_id_fkey"
            columns: ["deposito_origem_id"]
            isOneToOne: false
            referencedRelation: "depositos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transferencias_estoque_fazenda_destino_id_fkey"
            columns: ["fazenda_destino_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transferencias_estoque_fazenda_origem_id_fkey"
            columns: ["fazenda_origem_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transferencias_estoque_motorista_id_fkey"
            columns: ["motorista_id"]
            isOneToOne: false
            referencedRelation: "motoristas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transferencias_estoque_transportadora_id_fkey"
            columns: ["transportadora_id"]
            isOneToOne: false
            referencedRelation: "transportadoras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transferencias_estoque_veiculo_id_fkey"
            columns: ["veiculo_id"]
            isOneToOne: false
            referencedRelation: "veiculos"
            referencedColumns: ["id"]
          },
        ]
      }
      transferencias_estoque_itens: {
        Row: {
          created_at: string | null
          custo_unitario: number | null
          id: string
          insumo_id: string
          lote_semente: string | null
          quantidade: number
          transferencia_id: string
          unidade_medida: string
          valor_total: number | null
          variedade: string | null
        }
        Insert: {
          created_at?: string | null
          custo_unitario?: number | null
          id?: string
          insumo_id: string
          lote_semente?: string | null
          quantidade: number
          transferencia_id: string
          unidade_medida?: string
          valor_total?: number | null
          variedade?: string | null
        }
        Update: {
          created_at?: string | null
          custo_unitario?: number | null
          id?: string
          insumo_id?: string
          lote_semente?: string | null
          quantidade?: number
          transferencia_id?: string
          unidade_medida?: string
          valor_total?: number | null
          variedade?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transferencias_estoque_itens_insumo_id_fkey"
            columns: ["insumo_id"]
            isOneToOne: false
            referencedRelation: "insumos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transferencias_estoque_itens_transferencia_id_fkey"
            columns: ["transferencia_id"]
            isOneToOne: false
            referencedRelation: "transferencias_estoque"
            referencedColumns: ["id"]
          },
        ]
      }
      transportadoras: {
        Row: {
          ativa: boolean | null
          bairro: string | null
          cep: string | null
          cnpj: string | null
          cpf: string | null
          created_at: string | null
          email: string | null
          empresa_id: string | null
          fazenda_id: string
          fone: string | null
          id: string
          ie: string | null
          logradouro: string | null
          municipio: string | null
          nome_fantasia: string | null
          numero: string | null
          obs: string | null
          razao_social: string
          rntrc: string | null
          telefone: string | null
          uf: string | null
        }
        Insert: {
          ativa?: boolean | null
          bairro?: string | null
          cep?: string | null
          cnpj?: string | null
          cpf?: string | null
          created_at?: string | null
          email?: string | null
          empresa_id?: string | null
          fazenda_id: string
          fone?: string | null
          id?: string
          ie?: string | null
          logradouro?: string | null
          municipio?: string | null
          nome_fantasia?: string | null
          numero?: string | null
          obs?: string | null
          razao_social: string
          rntrc?: string | null
          telefone?: string | null
          uf?: string | null
        }
        Update: {
          ativa?: boolean | null
          bairro?: string | null
          cep?: string | null
          cnpj?: string | null
          cpf?: string | null
          created_at?: string | null
          email?: string | null
          empresa_id?: string | null
          fazenda_id?: string
          fone?: string | null
          id?: string
          ie?: string | null
          logradouro?: string | null
          municipio?: string | null
          nome_fantasia?: string | null
          numero?: string | null
          obs?: string | null
          razao_social?: string
          rntrc?: string | null
          telefone?: string | null
          uf?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transportadoras_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transportadoras_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      tratamento_receitas: {
        Row: {
          created_at: string | null
          cultura: string | null
          descricao: string | null
          fazenda_id: string
          id: string
          nome: string
        }
        Insert: {
          created_at?: string | null
          cultura?: string | null
          descricao?: string | null
          fazenda_id: string
          id?: string
          nome: string
        }
        Update: {
          created_at?: string | null
          cultura?: string | null
          descricao?: string | null
          fazenda_id?: string
          id?: string
          nome?: string
        }
        Relationships: [
          {
            foreignKeyName: "tratamento_receitas_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
        ]
      }
      tratamento_receitas_itens: {
        Row: {
          categoria: string | null
          created_at: string | null
          dose_100kg: number | null
          id: string
          insumo_id: string | null
          ordem: number | null
          produto_nome: string | null
          receita_id: string
          unidade: string | null
        }
        Insert: {
          categoria?: string | null
          created_at?: string | null
          dose_100kg?: number | null
          id?: string
          insumo_id?: string | null
          ordem?: number | null
          produto_nome?: string | null
          receita_id: string
          unidade?: string | null
        }
        Update: {
          categoria?: string | null
          created_at?: string | null
          dose_100kg?: number | null
          id?: string
          insumo_id?: string | null
          ordem?: number | null
          produto_nome?: string | null
          receita_id?: string
          unidade?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tratamento_receitas_itens_insumo_id_fkey"
            columns: ["insumo_id"]
            isOneToOne: false
            referencedRelation: "insumos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tratamento_receitas_itens_receita_id_fkey"
            columns: ["receita_id"]
            isOneToOne: false
            referencedRelation: "tratamento_receitas"
            referencedColumns: ["id"]
          },
        ]
      }
      tratamento_sementes: {
        Row: {
          ciclo_id: string | null
          created_at: string | null
          cultivar: string | null
          cultura: string | null
          data_conclusao: string | null
          data_inicio: string | null
          data_planejada: string | null
          deposito_destino_id: string | null
          deposito_origem_id: string | null
          equipamento: string | null
          fazenda_id: string
          germinacao_pct: number | null
          id: string
          insumo_id: string | null
          lote_semente: string | null
          numero: number | null
          observacao: string | null
          operador: string | null
          quantidade_kg: number | null
          quantidade_sc: number | null
          status: string
          umidade_pct: number | null
          updated_at: string | null
          vigor_pct: number | null
          volume_calda_ml_100kg: number | null
        }
        Insert: {
          ciclo_id?: string | null
          created_at?: string | null
          cultivar?: string | null
          cultura?: string | null
          data_conclusao?: string | null
          data_inicio?: string | null
          data_planejada?: string | null
          deposito_destino_id?: string | null
          deposito_origem_id?: string | null
          equipamento?: string | null
          fazenda_id: string
          germinacao_pct?: number | null
          id?: string
          insumo_id?: string | null
          lote_semente?: string | null
          numero?: number | null
          observacao?: string | null
          operador?: string | null
          quantidade_kg?: number | null
          quantidade_sc?: number | null
          status?: string
          umidade_pct?: number | null
          updated_at?: string | null
          vigor_pct?: number | null
          volume_calda_ml_100kg?: number | null
        }
        Update: {
          ciclo_id?: string | null
          created_at?: string | null
          cultivar?: string | null
          cultura?: string | null
          data_conclusao?: string | null
          data_inicio?: string | null
          data_planejada?: string | null
          deposito_destino_id?: string | null
          deposito_origem_id?: string | null
          equipamento?: string | null
          fazenda_id?: string
          germinacao_pct?: number | null
          id?: string
          insumo_id?: string | null
          lote_semente?: string | null
          numero?: number | null
          observacao?: string | null
          operador?: string | null
          quantidade_kg?: number | null
          quantidade_sc?: number | null
          status?: string
          umidade_pct?: number | null
          updated_at?: string | null
          vigor_pct?: number | null
          volume_calda_ml_100kg?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tratamento_sementes_ciclo_id_fkey"
            columns: ["ciclo_id"]
            isOneToOne: false
            referencedRelation: "ciclos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tratamento_sementes_deposito_destino_id_fkey"
            columns: ["deposito_destino_id"]
            isOneToOne: false
            referencedRelation: "depositos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tratamento_sementes_deposito_origem_id_fkey"
            columns: ["deposito_origem_id"]
            isOneToOne: false
            referencedRelation: "depositos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tratamento_sementes_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tratamento_sementes_insumo_id_fkey"
            columns: ["insumo_id"]
            isOneToOne: false
            referencedRelation: "insumos"
            referencedColumns: ["id"]
          },
        ]
      }
      tratamento_sementes_itens: {
        Row: {
          categoria: string | null
          consumo_real: number | null
          created_at: string | null
          dose_100kg: number | null
          dose_total: number | null
          id: string
          insumo_id: string | null
          ordem: number | null
          produto_nome: string | null
          tratamento_id: string
          unidade: string | null
        }
        Insert: {
          categoria?: string | null
          consumo_real?: number | null
          created_at?: string | null
          dose_100kg?: number | null
          dose_total?: number | null
          id?: string
          insumo_id?: string | null
          ordem?: number | null
          produto_nome?: string | null
          tratamento_id: string
          unidade?: string | null
        }
        Update: {
          categoria?: string | null
          consumo_real?: number | null
          created_at?: string | null
          dose_100kg?: number | null
          dose_total?: number | null
          id?: string
          insumo_id?: string | null
          ordem?: number | null
          produto_nome?: string | null
          tratamento_id?: string
          unidade?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tratamento_sementes_itens_insumo_id_fkey"
            columns: ["insumo_id"]
            isOneToOne: false
            referencedRelation: "insumos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tratamento_sementes_itens_tratamento_id_fkey"
            columns: ["tratamento_id"]
            isOneToOne: false
            referencedRelation: "tratamento_sementes"
            referencedColumns: ["id"]
          },
        ]
      }
      unidades_medida: {
        Row: {
          base_sigla: string | null
          created_at: string | null
          fator_base: number | null
          id: string
          inativo: boolean
          nome: string
          sigla: string
          tipo: string
        }
        Insert: {
          base_sigla?: string | null
          created_at?: string | null
          fator_base?: number | null
          id?: string
          inativo?: boolean
          nome: string
          sigla: string
          tipo?: string
        }
        Update: {
          base_sigla?: string | null
          created_at?: string | null
          fator_base?: number | null
          id?: string
          inativo?: boolean
          nome?: string
          sigla?: string
          tipo?: string
        }
        Relationships: []
      }
      usuarios: {
        Row: {
          ativo: boolean
          auth_user_id: string | null
          created_at: string | null
          email: string
          fazenda_id: string | null
          grupo_id: string | null
          hub_acesso: string | null
          id: string
          nome: string
          whatsapp: string | null
        }
        Insert: {
          ativo?: boolean
          auth_user_id?: string | null
          created_at?: string | null
          email: string
          fazenda_id?: string | null
          grupo_id?: string | null
          hub_acesso?: string | null
          id?: string
          nome: string
          whatsapp?: string | null
        }
        Update: {
          ativo?: boolean
          auth_user_id?: string | null
          created_at?: string | null
          email?: string
          fazenda_id?: string | null
          grupo_id?: string | null
          hub_acesso?: string | null
          id?: string
          nome?: string
          whatsapp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "usuarios_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "usuarios_grupo_id_fkey"
            columns: ["grupo_id"]
            isOneToOne: false
            referencedRelation: "grupos_usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      veiculos: {
        Row: {
          ano_fab: number | null
          ativo: boolean | null
          cap_kg: number | null
          cor: string | null
          created_at: string | null
          fazenda_id: string
          id: string
          marca: string | null
          modelo: string | null
          motorista_habitual_id: string | null
          obs: string | null
          placa: string
          proprietario: string | null
          proprietario_id: string | null
          proprietario_tipo: string | null
          renavam: string | null
          rntrc: string | null
          tara_kg: number | null
          tipo: string | null
          tipo_carroceria: string | null
          transportadora_id: string | null
          uf: string | null
          uf_placa: string | null
        }
        Insert: {
          ano_fab?: number | null
          ativo?: boolean | null
          cap_kg?: number | null
          cor?: string | null
          created_at?: string | null
          fazenda_id: string
          id?: string
          marca?: string | null
          modelo?: string | null
          motorista_habitual_id?: string | null
          obs?: string | null
          placa: string
          proprietario?: string | null
          proprietario_id?: string | null
          proprietario_tipo?: string | null
          renavam?: string | null
          rntrc?: string | null
          tara_kg?: number | null
          tipo?: string | null
          tipo_carroceria?: string | null
          transportadora_id?: string | null
          uf?: string | null
          uf_placa?: string | null
        }
        Update: {
          ano_fab?: number | null
          ativo?: boolean | null
          cap_kg?: number | null
          cor?: string | null
          created_at?: string | null
          fazenda_id?: string
          id?: string
          marca?: string | null
          modelo?: string | null
          motorista_habitual_id?: string | null
          obs?: string | null
          placa?: string
          proprietario?: string | null
          proprietario_id?: string | null
          proprietario_tipo?: string | null
          renavam?: string | null
          rntrc?: string | null
          tara_kg?: number | null
          tipo?: string | null
          tipo_carroceria?: string | null
          transportadora_id?: string | null
          uf?: string | null
          uf_placa?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "veiculos_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "veiculos_motorista_habitual_id_fkey"
            columns: ["motorista_habitual_id"]
            isOneToOne: false
            referencedRelation: "motoristas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "veiculos_proprietario_id_fkey"
            columns: ["proprietario_id"]
            isOneToOne: false
            referencedRelation: "pessoas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "veiculos_transportadora_id_fkey"
            columns: ["transportadora_id"]
            isOneToOne: false
            referencedRelation: "transportadoras"
            referencedColumns: ["id"]
          },
        ]
      }
      whatsapp_mensagens_processadas: {
        Row: {
          message_id: string
          processado_em: string
        }
        Insert: {
          message_id: string
          processado_em?: string
        }
        Update: {
          message_id?: string
          processado_em?: string
        }
        Relationships: []
      }
    }
    Views: {
      saldo_insumo_deposito: {
        Row: {
          deposito_id: string | null
          fazenda_id: string | null
          insumo_id: string | null
          saldo: number | null
        }
        Relationships: [
          {
            foreignKeyName: "movimentacoes_estoque_deposito_id_fkey"
            columns: ["deposito_id"]
            isOneToOne: false
            referencedRelation: "depositos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movimentacoes_estoque_fazenda_id_fkey"
            columns: ["fazenda_id"]
            isOneToOne: false
            referencedRelation: "fazendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movimentacoes_estoque_insumo_id_fkey"
            columns: ["insumo_id"]
            isOneToOne: false
            referencedRelation: "insumos"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      fn_pode_acessar_fazenda_campo: {
        Args: { p_fazenda_id: string }
        Returns: boolean
      }
      rls_minha_conta_id: { Args: never; Returns: string }
      rls_sou_raccotlo: { Args: never; Returns: boolean }
      set_talhao_area_plantada: {
        Args: { p_area: number; p_id: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
